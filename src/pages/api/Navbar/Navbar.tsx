import React, { Component } from 'react'
import { AssetService } from 'src/services/Asset.service';

class Navbar extends Component<any, any> {

  menuCollapse(){
    document.getElementById("mobileMenu").classList.toggle("show");
  }

  render() {
    return (
      <div className="w-screen flex flex-row items-center p-1 justify-between shadow-xs my-4">
      <div className="md:flex ml-5">
        <img src={AssetService.getPath('Logo_WAVECT_white_sym.png')} width='auto' height='50px' className='object-contain' />
      </div>
        <div className="flex flex-row-reverse mr-8 md:flex">
          <a href="https://wavect.io" target="_blank" title="Back to the main homepage">
            <div className="text-white text-center bg-black px-4 py-2 m-2">Back to Wavect.io</div>
          </a>
        </div>
    </div>
    );
  }
}

export default Navbar;
