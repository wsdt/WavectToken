import { faEthereum } from "@fortawesome/free-brands-svg-icons"
import { faDownload, faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const StepByStepGuide = (props: any) => {
    return <>
    <h1 className="mb-4 text-center font-black text-gray-300 tracking-wide">How does it work?</h1>
    <div className="flex">
      <div className="w-1/3 text-center px-6">
        <div
          className="bg-gray-300 rounded-lg flex items-center justify-center border border-gray-200">
          <div
            className="w-1/5 bg-transparent h-20 flex items-center justify-center icon-step">
                <FontAwesomeIcon icon={faDownload} />
          </div>
          <div
            className="w-4/5 bg-gray-200 h-24 flex flex-col items-center justify-center px-1 rounded-r-lg body-step">
            <h2 className="font-bold text-sm">Prepare Metamask</h2>
            <p className="text-xs text-gray-600">
              Install the <a href="https://metamask.io/download.html" target="_blank" title="Install Metamask">Metamask</a>&nbsp;
              browser extension & <a href="https://medium.com/@mark.lasia/how-to-buy-eth-metamask-bc52076a67ff" target="_blank" title="Metamask Tutorial">add some funds</a>&nbsp;
              to your wallet.
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-gray-200" width="24" height="24" viewBox="0 0 24 24"><path d="M14 2h-7.229l7.014 7h-13.785v6h13.785l-7.014 7h7.229l10-10z"/></svg>
      </div>
      <div className="w-1/3 text-center px-6">
        <div
          className="bg-gray-300 rounded-lg flex items-center justify-center border border-gray-200">
          <div className="w-1/5 bg-transparent h-20 flex items-center justify-center icon-step">
            <FontAwesomeIcon icon={faFileInvoiceDollar} />
          </div>
          <div
            className="w-4/5 bg-gray-200 h-24 flex flex-col items-center justify-center px-1 rounded-r-lg body-step">
            <h2 className="font-bold text-sm">Request invoice in ETH</h2>
            <p className="text-xs text-gray-600">
              Just hit us an e-mail to <a href="mailto:office@wavect.io" target="_blank" title="Request Crypto Invoice">office@wavect.io</a> with your invoice number and we will issue a new one immediately.
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-gray-200" width="24" height="24" viewBox="0 0 24 24"><path d="M14 2h-7.229l7.014 7h-13.785v6h13.785l-7.014 7h7.229l10-10z"/></svg>
      </div>
      <div className="w-1/3 text-center px-6">
        <div
          className="bg-gray-300 rounded-lg flex items-center justify-center border border-gray-200">
          <div className="w-1/5 bg-transparent h-20 flex items-center justify-center icon-step">
            <FontAwesomeIcon icon={faEthereum} />
          </div>
          <div
            className="w-4/5 bg-gray-200 h-24 flex flex-col items-center justify-center px-1 rounded-r-lg body-step">
            <h2 className="font-bold text-sm">Pay in Crypto</h2>
            <p className="text-xs text-gray-600">
              & wait for vouchers issued as WACT tokens. Then watch your WACT tokens grow in value (1 ETH = 1 WACT).
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
}