import { AppProps } from 'next/app'
import '../styles/index.css'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import React, { Component } from 'react'
import Web3 from 'web3'
// import DaiToken from '../abis/DaiToken.json'
import WavectToken from '../abis/WavectToken.json'
import TokenFarm from '../abis/TokenFarm.json'
import Navbar from './api/Navbar/Navbar'
import Main from './api/Main/Main'
import { LoadingIndicator } from './api/LoadingIndicator/LoadingIndicator';
import { NotificationService } from 'src/services/Notification.service';
import { EnvironmentService } from 'src/services/Environment.service';

class App extends Component<AppProps, any> {

  async componentDidMount() {
    await this.loadBlockchainData(
      await this.loadWeb3()
    )
  }

  async loadBlockchainData(web3: any) {
    if (web3) {
      const accounts = await web3.eth.getAccounts()
      this.setState({ account: accounts[0] })

      const networkId = await web3.eth.net.getId()

      // Load DaiToken
      // const daiTokenData = DaiToken.networks[networkId]
      // if(daiTokenData) {
      //   const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
      //   this.setState({ daiToken })
      //   let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call()
      //   this.setState({ daiTokenBalance: daiTokenBalance.toString() })
      // } else {
      //   NotificationService.showError('DaiToken contract not deployed to detected network.')
      // }

      // Load WavectToken

      const wavectTokenData = WavectToken.networks[networkId]
      if(wavectTokenData) {
        const wavectToken = new web3.eth.Contract(WavectToken.abi, wavectTokenData.address)
        this.setState({ wavectToken: wavectToken })
        let wavectTokenBalance = await wavectToken.methods.balanceOf(this.state.account).call()
        this.setState({ wavectTokenBalance: wavectTokenBalance.toString() })
      } else {
        NotificationService.showError('WavectToken contract not deployed to detected network.')
      }

      // Load TokenFarm
      const tokenFarmData = TokenFarm.networks[networkId]
      if(tokenFarmData) {
        const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
        this.setState({ tokenFarm })
        let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call()
        this.setState({ stakingBalance: stakingBalance.toString() })
      } else {
        NotificationService.showError('TokenFarm contract not deployed to detected network.')
      }
    }
    this.setState({ loading: false })
  }

  async loadWeb3() {
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

  stakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.tokenFarm.methods.stakeTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.setState({ loading: false })
        })

    // this.state.daiToken.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
    //   this.state.tokenFarm.methods.stakeTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
    //     this.setState({ loading: false })
    //   })
    // })
  }

  // unstakeTokens = (amount) => {
  //   this.setState({ loading: true })
  //   this.state.tokenFarm.methods.unstakeTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
  //     this.setState({ loading: false })
  //   })
  // }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      daiToken: {},
      dappToken: {},
      tokenFarm: {},
      daiTokenBalance: '0',
      dappTokenBalance: '0',
      stakingBalance: '0',
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading) {
      content =  <LoadingIndicator />
    } else {
      content = <Main
        showMaintenanceMode={EnvironmentService.isProductionEnv()}
        wavectTokenBalance={this.state.dappTokenBalance}
        stakingBalance={this.state.stakingBalance}
        stakeTokens={this.stakeTokens}
      />
    }

    return (
      <>
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '85%' }}>
              <div className="content mr-auto ml-auto">

                {content}

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
