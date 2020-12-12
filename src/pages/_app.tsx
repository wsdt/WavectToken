import 'react-notifications-component/dist/theme.css'
import ReactNotification from 'react-notifications-component'
import React, { Component } from 'react'
import Navbar from '../subcomponents/Navbar/Navbar'
import Main from '../subcomponents/Main/Main'
import { EnvironmentService } from 'src/services/Environment.service';
import { BlockchainService } from 'src/services/Blockchain.service';
import Emitter, { EVENT_BLOCKCHAIN_DATA_CHANGED } from 'src/services/Event.service';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import '../styles/index.css';
import Head from 'next/head'
import { BgParticles } from 'src/subcomponents/BgParticles/BgParticles'

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
      <Head>
        <title>Wavect® Token - Pay in Crypto & Save Money</title>
        <meta property="og:title" content="Wavect® Token - Pay in Crypto & Save Money" key="title" />
        <script src="https://cdn.rawgit.com/progers/pathseg/master/pathseg.js"></script>
      </Head>
      <div>
        <ReactNotification />
        <BgParticles />
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto">
              <div className="content mr-auto ml-auto">

              <Main
                showMaintenanceMode={EnvironmentService.isProductionEnv()}
                isConnectingToBlockchain={this.state.isConnectingToBlockchain}
              />

              </div>
            </main>
          </div>
        </div>
      </div>
      </>
    );
  }
}

export default App;
