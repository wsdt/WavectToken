import React, { Component } from 'react'
import { AssetService } from 'src/services/Asset.service';
import { INavbarProps } from './INavbar.props';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

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

        <span className="tracking-wider text-black bg-white px-4 py-1 text-sm rounded leading-loose mx-2 font-semibold" title="">
                   <i className="fas fa-award" aria-hidden="true"></i> {this.props.account}
        </span>

        <div className="flex flex-row-reverse mr-8 md:flex z-50">
          <a href="https://wavect.io" target="_blank" title="Back to the main homepage">
            <div className="text-white text-center rounded bg-black px-4 py-2 m-2">
              <FontAwesomeIcon icon={faHome} />
            </div>
          </a>
        </div>
    </div>
    );
  }
}

export default Navbar;
