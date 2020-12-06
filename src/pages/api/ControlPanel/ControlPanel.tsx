import { Component } from "react";
import styles from './ControlPanel.module.css';
import { IControlPanelProps } from "./IControlPanel.props";
import { IControlPanelState } from "./IControlPanel.state";

export class ControlPanel extends Component<IControlPanelProps, IControlPanelState> {
    state: IControlPanelState = {
        ethAmountToPay: 0,
    }

    private getRewardBalance() {
        return (window as any).web3.utils.fromWei(this.props.wavectTokenBalance, 'Ether');
    }

    private getStakedCrypto() {
        return (window as any).web3.utils.fromWei(this.props.stakingBalance, 'Ether');
    }

    private loadPaymentInput() {
        const submitPayment = () => {
            let amount = this.state.ethAmountToPay.toString()
            amount = (window as any).web3.utils.toWei(amount, 'Ether')
            this.props.stakeTokens(amount)
        }

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
      
        <button className="mt-4 w-full h-12 px-6 text-blue-100 transition-colors duration-150 bg-blue-700 rounded-lg focus:shadow-outline hover:bg-blue-800"
            onClick={() => submitPayment()}>Submit payment</button>
      </>);
    }

    private inputChangedHandler = (event) => {
        this.setState({ ...this.state, ethAmountToPay: event.target.value});
    }

    render() {
        return <div id={styles.controlPanelContainer}>
                <h1 className={styles.header}>Wavect Token</h1>
                <p className={styles.p}>We at Wavect not only accept certain cryptos such as ETH, BTC or XMR, but even want to encourage our customers to do so.</p>
                <p className={styles.p}>Therefore, each payment settled in cryptos will be rewarded with so-called Wavect-Tokens which can be redeemed in future projects.</p>
                <p className={styles.p}>Basically, it's just a futuristic and secure voucher :-)</p>
                <div>
                    <p className={styles.p}>Already paid in crypto:&nbsp;
                        <strong>{this.getStakedCrypto()} ETH</strong>
                    </p>
                    <p className={styles.p}>Reward Balance:&nbsp;
                        <strong>{this.getRewardBalance()} WACT</strong>
                    </p>
                </div>
                { this.loadPaymentInput() }
        </div>
    //     return <><table className="table table-borderless text-muted text-center">
    //     <thead>
    //       <tr>
    //         <th scope="col">Staking Balance</th>
    //         <th scope="col">Reward Balance</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr>
    //         <td>{(window as any).web3.utils.fromWei(this.props.stakingBalance, 'Ether')} mDAI</td>
    //         <td>{(window as any).web3.utils.fromWei(this.props.dappTokenBalance, 'Ether')} DAPP</td>
    //       </tr>
    //     </tbody>
    //   </table>
    
    //   <div className="card mb-4" >
    
    //     <div className="card-body">
    
    //       <form className="mb-3" onSubmit={(event) => {
    //           event.preventDefault()
    //           let amount
    //           amount = this.input.value.toString()
    //           amount = (window as any).web3.utils.toWei(amount, 'Ether')
    //           this.props.stakeTokens(amount)
    //         }}>
    //         <div>
    //           <label className="float-left"><b>Stake Tokens</b></label>
    //           <span className="float-right text-muted">
    //             Balance: {(window as any).web3.utils.fromWei(this.props.daiTokenBalance, 'Ether')}
    //           </span>
    //         </div>
    //         <div className="input-group mb-4">
    //           <input
    //             type="text"
    //             ref={(input) => { this.input = input }}
    //             className="form-control form-control-lg"
    //             placeholder="0"
    //             required />
    //           <div className="input-group-append">
    //             <div className="input-group-text">
    //               <img src='/dai.png' width='auto' height='32' alt=""/>
    //               &nbsp;&nbsp;&nbsp; mDAI
    //             </div>
    //           </div>
    //         </div>
    //         <button type="submit" className="btn btn-primary btn-block btn-lg">STAKE!</button>
    //       </form>
    //     </div> 
    //       </div></>
    }
}