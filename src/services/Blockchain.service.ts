import Web3 from "web3"
import { NotificationService } from "./Notification.service"
import WavectToken from '../abis/WavectToken.json'
import TokenFarm from '../abis/TokenFarm.json'
import Emitter, { EVENT_BLOCKCHAIN_DATA_CHANGED } from "./Event.service";

export class BlockchainService {
    private static _tokenFarmContract;
    private static _stakingBalance: string;
    private static _wavectTokenContract;
    private static _wavectTokenBalance: string;
    private static _account: string;

    public static async stakeTokens(amount: string, invoiceReference: string) {
        try {
            // needed for transferFrom --> needs to be called in user-context, that's why it's not in the smart contract
            await BlockchainService._wavectTokenContract.methods
              .increaseAllowance(BlockchainService._tokenFarmContract._address, amount)
                .send({from: BlockchainService._account}) 

            return await BlockchainService._tokenFarmContract.methods.stakeTokens(amount, invoiceReference).send({ 
              from: BlockchainService._account, 
              to: BlockchainService._tokenFarmContract._address,
              value: amount,
            });
        } finally {
            Emitter.emit(EVENT_BLOCKCHAIN_DATA_CHANGED);
        }
      }

      public static async connectToBlockchain() {
        try {
            await BlockchainService.loadBlockchainData(
              await BlockchainService.loadWeb3()
            )
          } catch(err) {
            NotificationService.showError('You need to allow your browser to connect to our Web3 service.', err)
          }
      }

      public static async getWavectTokenBalance(refresh?: boolean): Promise<string> {
          try {
            if (!BlockchainService._wavectTokenBalance || refresh) {
                BlockchainService._wavectTokenBalance = (await BlockchainService._wavectTokenContract.methods.balanceOf(
                    await BlockchainService.getCurrentAccount()).call()).toString();
            }
            return BlockchainService._wavectTokenBalance;
          } catch(err) {
              NotificationService.showError('Could not fetch Wavect Token balance.', err);
          } 
          return '0';
      }

        public static async getStakingBalance(refresh?: boolean): Promise<string> {
            try {
                if (!BlockchainService._stakingBalance || refresh) {
                    BlockchainService._stakingBalance = (await BlockchainService._tokenFarmContract.methods.stakingBalance(
                        await BlockchainService.getCurrentAccount()).call()).toString();
                    }
                    return BlockchainService._stakingBalance 
            } catch(err) {
                NotificationService.showError('Could not fetch staking balance.', err);
            } 
            return '0';
        }

        public static async getCurrentAccount(): Promise<any> {
            try {
                if (!BlockchainService._account) {
                    BlockchainService._account = (await (window as any).web3.eth.getAccounts())[0];
                }
                return BlockchainService._account;
            } catch(err) {
                NotificationService.showError('Could not fetch account.', err);
            }
            return '0x0';
        }

        private static async loadWavectTokenContract(networkId: string) {
          const wavectTokenData = WavectToken.networks[networkId]
          
          if(wavectTokenData) {
            BlockchainService._wavectTokenContract = new (window as any).web3.eth.Contract(WavectToken.abi, wavectTokenData.address);
          } else {
            NotificationService.showError('WavectToken contract not deployed to detected network.')
          }
          return BlockchainService._wavectTokenBalance;
        }

        private static async loadTokenFarmContract(networkId: string) {
          const tokenFarmData = TokenFarm.networks[networkId]
          if(tokenFarmData) {
            BlockchainService._tokenFarmContract = new (window as any).web3.eth.Contract(TokenFarm.abi, tokenFarmData.address);
          } else {
            NotificationService.showError('TokenFarm contract not deployed to detected network.')
          }
        }

      private static async loadBlockchainData(web3: any) {
        if (web3) {
          const networkId: string = await (window as any).web3.eth.net.getId()
          await BlockchainService.loadWavectTokenContract(networkId);
          await BlockchainService.loadTokenFarmContract(networkId);

          Emitter.once(EVENT_BLOCKCHAIN_DATA_CHANGED, () => NotificationService.showSuccess('Connected to Blockchain.'))
          
          setTimeout(() => {
            Emitter.emit(EVENT_BLOCKCHAIN_DATA_CHANGED);
          }, 100) // need to wait to let components to subscribe to this event
        }
      }
    
      private static async loadWeb3() {
          if ((window as any).ethereum) {
    
            (window as any).web3 = new Web3((window as any).ethereum)
            await (window as any).ethereum.enable()
          }
          else if ((window as any).web3) {
            (window as any).web3 = new Web3((window as any).web3.currentProvider)
          }
          else {
            NotificationService.showError('Non-Ethereum browser detected. You should consider trying MetaMask!')
          }
          return (window as any).web3;
      }
}