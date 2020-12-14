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

    public static convertWeiToETH = (wei: string) => {
      return (window as any).web3.utils.fromWei(wei, 'Ether');
    }

    public static convertStringToByte32 = (stringToEncode: string) => {
      return (window as any).web3.utils.fromAscii(stringToEncode);
    }

    public static async stakeTokens(amount: string, invoiceReference: string) {
      if (BlockchainService._wavectTokenContract?.methods && BlockchainService._tokenFarmContract?.methods) {  
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
       } else {
         // throw informative error, when contracts are not deployed (as we do this on-demand because of the costs) or when user doesn't has Metamask/ETH Browser
         NotificationService.showError('Your browser does not support Web3, does not have Metamask installed or you did not request an ETH invoice yet.');
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
              // NotificationService.showError('Could not fetch Wavect Token balance.', err);
              console.warn('Smart-Contracts not deployed yet (deployed on demand): Could not fetch WACT Token balance', err);
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
                // NotificationService.showError('Could not fetch staking balance.', err);
                console.warn('Smart-Contracts not deployed yet (deployed on demand): Could not fetch staking balance.', err);
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
            // NotificationService.showError('WavectToken contract not deployed to detected network.')
            console.warn('Smart-Contracts not deployed yet (deployed on demand): WavectToken contract not deployed to detected network.')
          }
          return BlockchainService._wavectTokenBalance;
        }

        private static async loadTokenFarmContract(networkId: string) {
          const tokenFarmData = TokenFarm.networks[networkId]
          if(tokenFarmData) {
            BlockchainService._tokenFarmContract = new (window as any).web3.eth.Contract(TokenFarm.abi, tokenFarmData.address);
          } else {
            // NotificationService.showError('TokenFarm contract not deployed to detected network.')
            console.warn('Smart-Contracts not deployed yet (deployed on demand): TokenFarm contract not deployed to detected network.');
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