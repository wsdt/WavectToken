import React, { Component } from 'react'
import { BlockchainService } from 'src/services/Blockchain.service';
import Emitter, { EVENT_BLOCKCHAIN_DATA_CHANGED } from 'src/services/Event.service';
import { BgParticles } from '../BgParticles/BgParticles';
import { BgVideo } from '../BgVideo/BgVideo';
import { ControlPanel } from '../ControlPanel/ControlPanel';
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator';
import { StepByStepGuide } from '../StepByStepGuide/StepByStepGuide';
import { IMainProps } from './IMain.props';
import { IMainState } from './IMain.state';
import styles from './Main.module.css';

export class Main extends Component<IMainProps, IMainState> {

  state: IMainState = {
    wavectTokenBalance: '0',
    stakingBalance: '0',
    isLoading: true,
  };

  async componentDidMount() {
    // Load blockchain data once
    Emitter.on(EVENT_BLOCKCHAIN_DATA_CHANGED, async () => {
      try {
        this.setState({
          wavectTokenBalance: (await BlockchainService.getWavectTokenBalance(true)),
          stakingBalance: (await BlockchainService.getStakingBalance(true)),
        });
      } finally {
        this.setState({...this.state, isLoading: false })
      }
    })
  }

  private loadMaintenanceScreen() {
    return <h1 className="text-white" id={styles.maintenanceFont}><strong>Wavect<sup>®</sup> Token</strong><br />coming soon..</h1>
  }

  render() {
    return (
      <>
      { (this.props.isConnectingToBlockchain || this.state.isLoading) && !this.props.showMaintenanceMode
          ? <LoadingIndicator />
          : <><div id="content" className={`mt-8 ml-2 mr-2 flex inset-0 items-center justify-center ${styles.contentContainer}`}>
              <div className="bg-black bg-opacity-80 p-6 rounded-md w-max row-span-3">
                { this.props.showMaintenanceMode 
                  ? this.loadMaintenanceScreen()
                  : <ControlPanel wavectTokenBalance={this.state.wavectTokenBalance} 
                      stakingBalance={this.state.stakingBalance} /> }
              </div>
            </div> 
            <div className={`mt-12 mb-10 ml-10 mr-10 sm:ml-10 sm:mr-10 xl:ml-40 xl:mr-40`}>
              <StepByStepGuide />
            </div>
            </>
        }
      </>
    );
  }
}

export default Main;
