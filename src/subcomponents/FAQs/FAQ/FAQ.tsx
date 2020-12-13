import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { Component } from "react"
import { IRenderFAQProps } from "./IFAQ.props"
import { IFAQState } from "./IFAQ.state"

export class FAQ extends Component<IRenderFAQProps, IFAQState> {
    state: IFAQState = {
        isOpened: false,
    }

    private renderCollapseIcon = () => {
        return <div className="px-2 mt-1">
                <div>
                    <FontAwesomeIcon icon={this.state.isOpened ? faChevronUp : faChevronDown} />
                </div>
            </div>    
    }

    render() {
        return  <div className="mb-2">
                    <div className="font-medium rounded-sm text-lg px-2 py-3 flex text-gray-800 flex-row-reverse mt-2 cursor-pointer text-black bg-gray-200 hover:bg-gray-300"
                        onClick={() => this.setState({...this.state, isOpened: !this.state.isOpened})}>
                            <div className="flex-auto">{this.props.title}</div>
                            {this.renderCollapseIcon()}
                    </div>
                    <div className={`p-4 pt-2 text-justify text-left text-gray-800 mb-5 bg-gray-200 ${this.state.isOpened ? '' : 'hidden'}`}>
                        {this.props.description}
                    </div>
                </div>
    }
}