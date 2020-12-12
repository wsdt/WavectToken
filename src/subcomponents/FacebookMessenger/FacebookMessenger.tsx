import React from "react"
import FacebookMessengerCustomerChat from 'react-messenger-customer-chat';

export const FacebookMessenger = (props:any) => {
    return <FacebookMessengerCustomerChat
                pageId="243867366515546"
                appId="3121144401446010"
                minimized={true}
                themeColor="#76b9c3"
                loggedInGreeting="Having troubles with Metamask, transferring cryptos or general questions?"
                loggedOutGreeting="Having troubles with Metamask, transferring cryptos or general questions?"
            />
}