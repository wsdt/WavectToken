import React, { Component } from 'react'
import { BlockchainService } from 'src/services/Blockchain.service';
import Emitter, { EVENT_BLOCKCHAIN_DATA_CHANGED } from 'src/services/Event.service';
import { BgVideo } from '../BgVideo/BgVideo';
import { ControlPanel } from '../ControlPanel/ControlPanel';
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator';
import { IMainProps } from './IMain.props';
import { IMainState } from './IMain.state';


export class Main extends Component<IMainProps, IMainState> {

  state: IMainState = {
    wavectTokenBalance: '0',
    stakingBalance: '0',
    isLoading: true,
  };

  async componentDidMount() {
    // Load blockchain data once
    Emitter.on(EVENT_BLOCKCHAIN_DATA_CHANGED, async () => {
      this.setState({
        wavectTokenBalance: (await BlockchainService.getWavectTokenBalance(true)),
        stakingBalance: (await BlockchainService.getStakingBalance(true)),
        isLoading: false,
      });
    })
  }

  private loadMaintenanceScreen() {
    return <h1 className="text-white text-5xl"><strong>Wavect® Token</strong><br />coming soon..</h1>
  }

  render() {
    return (
      <>
      <BgVideo />
      { this.props.isConnectingToBlockchain || this.state.isLoading
          ? <LoadingIndicator />
          : <div id="content" className="mt-3 ml-2 mr-2 absolute inset-0 flex items-center justify-center">
              <div className="bg-black bg-opacity-80 p-6 rounded-md w-max">
                { this.props.showMaintenanceMode 
                  ? this.loadMaintenanceScreen()
                  : <ControlPanel wavectTokenBalance={this.state.wavectTokenBalance} 
                      stakingBalance={this.state.stakingBalance} /> }
              </div>
            </div> 
        }
      </>
    );
  }
}

export default Main;
