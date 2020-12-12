import React from "react"
import FacebookMessengerCustomerChat from 'react-messenger-customer-chat';

export const FacebookMessenger = (props:any) => {
    return <FacebookMessengerCustomerChat
                pageId="243867366515546"
                appId="<APP_ID>"
                minimized={true}
                themeColor="#76b9c3"
                htmlRef="<REF_STRING>"
            />
}