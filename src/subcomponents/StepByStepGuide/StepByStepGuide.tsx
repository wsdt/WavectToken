import { faEthereum } from "@fortawesome/free-brands-svg-icons"
import { faArrowDown, faArrowRight, faDownload, faFileInvoiceDollar, faPercent, IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const renderStepArrow = () => {
    return <div className={`flex-1 flex items-center justify-center text-3xl text-gray-200 m-5 xl:m-0 sm:m-5`}>
        <FontAwesomeIcon icon={faArrowRight} className="hidden xl:block sm:hidden" />
        <FontAwesomeIcon icon={faArrowDown} className="block xl:hidden sm:block" />
    </div>;
}

const renderStepNode = (title: string, description: JSX.Element, icon: IconDefinition) => {
    return <div className='w-full sm:w-full xl:w-1/3 text-center px-6'>
    <div
      className="bg-gray-300 rounded-lg flex items-center justify-center border border-gray-200">
      <div
        className="w-1/5 bg-transparent h-20 flex items-center justify-center icon-step text-xl">
            <FontAwesomeIcon icon={icon} />
      </div>
      <div
        className="w-4/5 bg-gray-200 h-24 flex flex-col items-center justify-center px-1 rounded-r-lg body-step">
        <h2 className="font-bold text-sm">{title}</h2>
        <p className="text-xs text-gray-600">
          {description}
        </p>
      </div>
    </div>
  </div>;
}

export const StepByStepGuide = (props: any) => {
    return <>
    <h1 className="mb-4 text-center font-black text-gray-300 tracking-wide">How does it work?</h1>
    <div className='flex flex-col sm:flex-col xl:flex-row'>
      {renderStepNode('Prepare Metamask',  
        <>Install the <a href="https://metamask.io/download.html" target="_blank" title="Install Metamask">Metamask</a>&nbsp;
            browser extension & <a href="https://medium.com/@mark.lasia/how-to-buy-eth-metamask-bc52076a67ff" target="_blank" title="Metamask Tutorial">add some funds</a>&nbsp;
            to your wallet.</>, 
            faDownload)}
      {renderStepArrow()}
      {renderStepNode('Request invoice in ETH',
        <>Just hit us an e-mail to <a href="mailto:office@wavect.io" target="_blank" title="Request Crypto Invoice">office@wavect.io</a> with your invoice number and we will issue a new one immediately.</>,
        faFileInvoiceDollar)}
      {renderStepArrow()}
      {renderStepNode('Pay in Crypto',
        <>& wait for vouchers issued as WACT tokens. Then watch your WACT tokens grow in value (1 ETH = 1 WACT).</>,
        faEthereum)}
      {renderStepArrow()}
      {renderStepNode('Redeem WACT',
        <>& save money. The Smart-Contract will automatically use your WACT-Tokens up before transferring your ETH.</>,
        faPercent)}
    </div>
    </>
}