import React, { Component } from 'react'
import { BgVideo } from '../BgVideo/BgVideo';
import { ControlPanel } from '../ControlPanel/ControlPanel';
import { IMainProps } from './IMain.props';


export class Main extends Component<IMainProps, any> {

  private loadMaintenanceScreen() {
    return <h1 className="text-white text-5xl"><strong>WavectToken</strong><br />coming soon..</h1>
  }

  render() {
    return (
      <>
      <BgVideo />
      <div id="content" className="mt-3 absolute inset-0 flex items-center justify-center">
        <div className="bg-black bg-opacity-80 p-6 rounded-md w-max">
          { this.props.showMaintenanceMode 
            ? this.loadMaintenanceScreen()
            : <ControlPanel {...this.props} /> }
          </div>
      </div>
      </>
    );
  }
}

export default Main;
