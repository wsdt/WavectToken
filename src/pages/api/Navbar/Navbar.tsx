import React, { Component } from 'react'
import { AssetService } from 'src/services/Asset.service';
import { INavbarProps } from './INavbar.props';

class Navbar extends Component<INavbarProps, any> {

  menuCollapse(){
    document.getElementById("mobileMenu").classList.toggle("show");
  }

  render() {
    return (
      <div className="w-screen flex flex-row items-center p-1 justify-between shadow-xs my-4">
        <div className="md:flex ml-5 z-50">
          <img src={AssetService.getPath('Logo_WAVECT_white_sym.png')} width='auto' height='50px' className='object-contain' />
        </div>
        <div className='md:flex z-50 flex-row text-white font-bold'>
          {this.props.account}
        </div>
        <div className="flex flex-row-reverse mr-8 md:flex z-50">
          <a href="https://wavect.io" target="_blank" title="Back to the main homepage">
            <div className="text-white text-center bg-black px-4 py-2 m-2">Back to Wavect.io</div>
          </a>
        </div>
    </div>
    );
  }
}

export default Navbar;
