import { Component } from "react";
import { BlockchainService } from "src/services/Blockchain.service";
import { NotificationService } from "src/services/Notification.service";
import { ControlPanelHeader } from "../ControlPanelHeader/ControlPanelHeader";
import { LoadingIndicatorSmall } from "../LoadingIndicator/LoadingIndicatorSmall/LoadingIndicatorSmall";
import styles from './ControlPanel.module.css';
import { IControlPanelProps } from "./IControlPanel.props";
import { IControlPanelState } from "./IControlPanel.state";

export class ControlPanel extends Component<IControlPanelProps, IControlPanelState> {
    state: IControlPanelState = {
        ethAmountToPay: 1,
        invoiceReference: '',
        isLoading: false,
    }

    private submitPayment = async () => {
      // also working for undefined out-of-the-box due to javaScript nature
      if (this.state.ethAmountToPay > 0 && this.state.invoiceReference) {
        // length of 32 needed as smart contract uses byte32 instead of string to save gas
        if (this.state.invoiceReference.length >= 32) {
          NotificationService.showWarning('InvoiceReference must not be longer than 32 chars.');
        } else {
          this.setState({...this.state, isLoading: true })
          try {
            let amount = this.state.ethAmountToPay.toString()
            amount = (window as any).web3.utils.toWei(amount, 'Ether') 
            await BlockchainService.stakeTokens(amount, 
              BlockchainService.convertStringToByte32(this.state.invoiceReference))
            NotificationService.showSuccess('ETH transferred successfully.');
          } catch(err) {
            NotificationService.showError('Could not transfer ETH to Wavect.', err);
          } finally {
            this.setState({...this.state, isLoading: false })
          }
        }
      } else {
        if (!this.state.invoiceReference) {
          NotificationService.showWarning('Please add the related invoice number.');
        } else {
          NotificationService.showWarning('You cannot transfer 0 or less ETH.');
        }
      }
    }

    private loadPaymentInput() { 
        return (<><div className="grid xl:grid-cols-2 md:grid-cols-1 gap-4">
        <div className={styles.paymentInput}>
          <label htmlFor="price" className="block text-sm font-medium text-white">Invoice-Reference</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input type="text" name="invoiceReference" id="invoiceReference" 
              className="font-bold text-center p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md text-black" 
              placeholder="2020012-2-15" value={this.state.invoiceReference} onChange={(event)=>this.inputChangedHandler(event, 'invoiceReference')} />
          </div>
        </div>
          
        <div className={styles.paymentInput}>
          <label htmlFor="price" className="block text-sm font-medium text-white">Price</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">Ξ</span>
            </div>
            <input type="text" name="price" id="price" className="font-bold text-center p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md text-black" 
              placeholder="0.00" value={this.state.ethAmountToPay} onChange={(event)=>this.inputChangedHandler(event, 'ethAmountToPay')} />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label htmlFor="currency" className="sr-only">Currency</label>
              <select id="Currency" name="currency" className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
                <option>ETH</option>
              </select>
            </div>
          </div>
      </div>
      </div>
      
      <button className="align-middle mt-4 w-full h-12 px-6 text-blue-100 transition-colors duration-150 bg-blue-700 disabled:opacity-50 rounded-lg focus:shadow-outline enabled:hover:bg-blue-800"
          onClick={async () => await this.submitPayment()} disabled={this.state.isLoading}>
            {this.state.isLoading 
              ? <LoadingIndicatorSmall />
              : "Submit payment"}
            </button>
      </>);
    }

    private inputChangedHandler = (event, elToUpdate: string) => {
        this.setState({ ...this.state, [elToUpdate]: event.target.value});
    }

    render() {
        return <div id={styles.controlPanelContainer}>
                <ControlPanelHeader stakingBalance={this.props.stakingBalance} 
                  wavectTokenBalance={this.props.wavectTokenBalance} />

                <h1 className={`mt-5 ${styles.header}`}>Wavect  Token</h1>
                <p className={styles.p}>We at Wavect not only accept payments in cryptos, but even want to encourage our customers to do so.</p>
                <p className={styles.p}>Therefore, each payment settled with cryptocurrencies will increase the amount of so-called Wavect-Tokens you earn, which can then be redeemed in future projects.</p>
                <p className={styles.p}>Basically, it's just a futuristic and secure voucher :-). Still some questions? Hit us a message via the Facebook-Messenger below.</p>

                { this.loadPaymentInput() }
        </div>
    }
}