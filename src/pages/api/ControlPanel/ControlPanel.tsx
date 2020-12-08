import { Component } from "react";
import { BlockchainService } from "src/services/Blockchain.service";
import { NotificationService } from "src/services/Notification.service";
import styles from './ControlPanel.module.css';
import { IControlPanelProps } from "./IControlPanel.props";
import { IControlPanelState } from "./IControlPanel.state";

export class ControlPanel extends Component<IControlPanelProps, IControlPanelState> {
    state: IControlPanelState = {
        ethAmountToPay: 1,
        isLoading: false,
    }

    private getRewardBalance = () => {
        return (window as any).web3.utils.fromWei(this.props.wavectTokenBalance, 'Ether');
    }

    private getStakedCrypto = () => {
        return (window as any).web3.utils.fromWei(this.props.stakingBalance, 'Ether');
    }

    private submitPayment = async () => {
      // also working for undefined out-of-the-box due to javaScript nature
      if (this.state.ethAmountToPay > 0) {
        this.setState({...this.state, isLoading: true })
        try {
          let amount = this.state.ethAmountToPay.toString()
          amount = (window as any).web3.utils.toWei(amount, 'Ether')
          await BlockchainService.stakeTokens(amount)
          NotificationService.showSuccess('ETH transferred successfully.');
        } catch(err) {
          NotificationService.showError('Could not transfer ETH to Wavect.', err);
        } finally {
          this.setState({...this.state, isLoading: false })
        }
      } else {
        NotificationService.showError('You cannot transfer 0 or less ETH.');
      }
    }

    private loadPaymentInput() { 
        return (<>
        <div className={styles.paymentInput}>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">Ξ</span>
          </div>
          <input type="text" name="price" id="price" className="p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md text-black" 
            placeholder="0.00" value={this.state.ethAmountToPay} onChange={(event)=>this.inputChangedHandler(event)} />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">Currency</label>
            <select id="Currency" name="currency" className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
              <option>ETH</option>
            </select>
          </div>
        </div>
      </div>
      
        <button className="align-middle mt-4 w-full h-12 px-6 text-blue-100 transition-colors duration-150 bg-blue-700 disabled:opacity-50 rounded-lg focus:shadow-outline enabled:hover:bg-blue-800"
            onClick={async () => await this.submitPayment()} disabled={this.state.isLoading}>
              {this.state.isLoading 
                ? <div className={`mt-1 ${styles.ldsRipple}`}><div></div><div></div></div>
                : "Submit payment"}
              </button>
      </>);
    }

    private inputChangedHandler = (event) => {
        this.setState({ ...this.state, ethAmountToPay: event.target.value});
    }

    render() {
        return <div id={styles.controlPanelContainer}>
                <span className="tracking-wider text-white bg-blue-800 px-4 py-1 text-sm rounded leading-loose mx-2 font-semibold" title="">
                   <i className="fas fa-award" aria-hidden="true"></i> {this.getStakedCrypto()} ETH paid
                </span>

                <span className="tracking-wider text-white bg-blue-400 px-4 py-1 text-sm rounded leading-loose mx-2 font-semibold" title="">
                   <i className="fas fa-award" aria-hidden="true"></i> {this.getRewardBalance()} WACT earned
                </span>
                <h1 className={styles.header}>Wavect<sup>®</sup> Token</h1>
                <p className={styles.p}>We at Wavect not only accept certain cryptos such as ETH, BTC or XMR, but even want to encourage our customers to do so.</p>
                <p className={styles.p}>Therefore, each payment settled in cryptos will be rewarded with so-called Wavect-Tokens which can be redeemed in future projects.</p>
                <p className={styles.p}>Basically, it's just a futuristic and secure voucher :-). At the moment only Ethereum is supported.</p>

                { this.loadPaymentInput() }
        </div>
    }
}