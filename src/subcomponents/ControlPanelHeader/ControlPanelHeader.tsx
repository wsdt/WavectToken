import { faCoins, faMoneyCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { BlockchainService } from "src/services/Blockchain.service";
import { EnvironmentService } from "src/services/Environment.service";
import { NotificationService } from "src/services/Notification.service";
import { IControlPanelHeaderProps } from "./IControlPanelHeader.props";
import { IControlPanelHeaderState } from "./IControlPanelHeader.state";

export class ControlPanelHeader extends Component<IControlPanelHeaderProps, IControlPanelHeaderState> {

    state: IControlPanelHeaderState = {
        currentETHPriceInEUR: '0', 
        ethPriceChangeLast24Hours: 0,
    }

    async componentDidMount() {
        try {
            // Only call external api in production avoid hitting api-limit
            if (EnvironmentService.isProductionEnv()) {
                const resp = await fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=EUR&sign=true')
                    .then(response => response.json());
                
                this.setState({...this.state, 
                    currentETHPriceInEUR: resp.DISPLAY.ETH.EUR.PRICE, 
                    ethPriceChangeLast24Hours: resp.DISPLAY.ETH.EUR.CHANGEPCTDAY,
                });
            }
        } catch(err) {
            NotificationService.showWarning('Could not fetch current ETH exchange rate. Everything else should work fine.', err);
        }
    }

    private get24HourChangeClass() {
        if (!this.state.ethPriceChangeLast24Hours) return {jhStatsClass: 'neutral', color: 'gray', iconSvg: 'M17 11a1 1 0 010 2H7a1 1 0 010-2h10z'};
        if (this.state.ethPriceChangeLast24Hours > 0) return {jhStatsClass: 'positive', color: 'green', iconSvg: 'M20 15a1 1 0 002 0V7a1 1 0 00-1-1h-8a1 1 0 000 2h5.59L13 13.59l-3.3-3.3a1 1 0 00-1.4 0l-6 6a1 1 0 001.4 1.42L9 12.4l3.3 3.3a1 1 0 001.4 0L20 9.4V15z'};
        if (this.state.ethPriceChangeLast24Hours < 0) return {jhStatsClass: 'negative', color: 'red', iconSvg: 'M20 9a1 1 0 012 0v8a1 1 0 01-1 1h-8a1 1 0 010-2h5.59L13 10.41l-3.3 3.3a1 1 0 01-1.4 0l-6-6a1 1 0 011.4-1.42L9 11.6l3.3-3.3a1 1 0 011.4 0l6.3 6.3V9z'};
    }

    render() {
        const {jhStatsClass, color, iconSvg} = this.get24HourChangeClass();

        return <div className="grid grid-cols-6 gap-4">
            <div className="grid grid-rows-2 gap-4 align-middle col-span-3 lg:col-span-1 lg:col-start-5">
                <span className="tracking-wider text-center text-white bg-blue-800 px-4 pt-1 text-sm rounded leading-loose mx-2 font-semibold" title="Already paid Ethereum">
                        <FontAwesomeIcon icon={faCoins} /> {BlockchainService.convertWeiToETH(this.props.stakingBalance)} ETH paid
                    </span>

                <span className="tracking-wider text-center text-white bg-blue-400 px-4 pt-1 text-sm rounded leading-loose mx-2 font-semibold" title="Wavect-Tokens earned">
                    <FontAwesomeIcon icon={faMoneyCheck} /> {BlockchainService.convertWeiToETH(this.props.wavectTokenBalance)} WACT earned
                </span>
            </div>


            <div id={`jh-stats-${jhStatsClass}`} 
                className={`justify-center p-2 bg-${color}-700 border border-${color}-500 rounded col-span-3 lg:col-span-1`}>
                <div>
                    <div>
                        <p className={`flex items-center justify-end text-${color}-200 text-xs`}>
                            <span className="font-bold">{this.state.ethPriceChangeLast24Hours} %</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path className="heroicon-ui" d={iconSvg}/>
                                    </svg>
                        </p>
                    </div>
                    <p className={`flex justify-center text-xl font-semibold text-center text-${color}-200`}>
                        {this.state.currentETHPriceInEUR}
                    </p>
                    <p className={`text-md text-center text-${color}-300`}>equal 1 ETH</p>
                </div>
            </div>       
    </div>
    }
}