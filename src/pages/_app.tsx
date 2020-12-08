import { AppProps } from 'next/app'
import '../styles/index.css'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import React, { Component } from 'react'
import Navbar from './api/Navbar/Navbar'
import Main from './api/Main/Main'
import { EnvironmentService } from 'src/services/Environment.service';
import { BlockchainService } from 'src/services/Blockchain.service';
import Emitter, { EVENT_BLOCKCHAIN_DATA_CHANGED } from 'src/services/Event.service';

interface IAppState {
  isConnectingToBlockchain: boolean;
  account: string;
}

class App extends Component<AppProps, IAppState> {

  async componentDidMount() {
    try {
      await BlockchainService.connectToBlockchain();
    } finally {
      // also stop loading in case blockchain network is down (e.g. local ganache)
      this.setState({...this.state, isConnectingToBlockchain: false});
    }

    Emitter.on(EVENT_BLOCKCHAIN_DATA_CHANGED, async () => {
      this.setState({...this.state, account: await BlockchainService.getCurrentAccount() });
    });
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      isConnectingToBlockchain: true
    }
  }

  render() {
    return (
      <>
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '85%' }}>
              <div className="content mr-auto ml-auto">

              <Main
                showMaintenanceMode={EnvironmentService.isProductionEnv()}
                isConnectingToBlockchain={this.state.isConnectingToBlockchain}
              />

              </div>
            </main>
          </div>
        </div>
        <NotificationContainer />
      </div>
      </>
    );
  }
}

export default App;
