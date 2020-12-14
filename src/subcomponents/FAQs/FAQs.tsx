import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Component } from "react"
import { FAQ } from "./FAQ/FAQ"

export const FAQs = (props: any) => {
    return <div className="mx-auto max-w-6xl mt-16">
        <div className="p-2 rounded">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 p-4 text-sm">
                    <div className="text-3xl text-gray-200">Frequently asked <span className="font-medium">Questions</span></div>
                    <div className="my-2 text-gray-200">Still wondering how this service works?</div>
                    <div className="mb-2 text-gray-200">Confused about the whole Blockchain thing?</div>
                    <div className="text-xs text-gray-400">Dive into our FAQ for more details</div>
                </div>
                <div className="md:w-2/3">
                    <div className="p-4">
                        <FAQ title="What is this about?"
                            description={<>
                                <p className="mb-4">Cryptocurrencies and their underlying technology called Blockchain have a lot of potential.
                                    The majority of people already call web-apps that make use of smart contracts (= intelligent digital 
                                    contract executed on the Blockchain without any intermediary) the <strong>Web 3.0</strong>.
                                </p>
                                <p>Every crypto currency has a different use-case (and there are really a lot of them). 
                                    The most known are Bitcoin and Ethereum. While BTC is already considered some sort of accepted 
                                    currency/commodity, ETH is besides that a more functional cryptocurrency. With ETH one can write
                                    so-called smart-contracts, which allow to execute processes automatically and directly on the Blockchain 
                                    without any intermediary. This application is also based on numerous smart-contracts and provides 
                                    a graphical user interface for you to interact with them. 
                                </p>
                            </>} />  

                        <FAQ title="What is a gas fee?" 
                            description={<>
                                <p className="mb-4">Ever heard of the so-called miners (mostly related to Bitcoin)? Most blockchains are based on either&nbsp;
                                    <strong>Proof-of-Work</strong> or <strong>Proof-of-Stake</strong> while ETH & BTC make both use of
                                    Proof-of-Work to date, this might change at least for Ethereum in the future as they plan to switch 
                                    to Proof-of-Stake.
                                </p>
                                <p>In both systems the stakers (Proof-of-Stake) as well as the miners (Proof-of-Work) become rewarded 
                                    for their service ("working" / "staking"). This is necessary, as Blockchains are decentralized and
                                    require some sort of consensus (what transactions are valid?). To keep it simple, we could say, that
                                    the Gas fee we have to pay for transactions, is the reward the stakers & miners receive. 
                                </p>
                            </>} />
                        <FAQ title="Why do I have to grant 2 transactions when transferring my ETH?"
                            description={<>
                                This is just a security measure by the Ethereum blockchain. The first transaction is basically just
                                authorizing our smart contract to transfer your WACT tokens back to itself (in case you have received any).
                                The 2nd transaction is the actual Ethereum transaction.
                            </>} />

                        <FAQ title="Could it happen that the WACT tokens I've received today worth 400 € each could be worth 2000€ in 5 years?"
                            description={<>
                                Absolutely, that's one of the benefits using this voucher system. 
                                When we get paid in ETH we don't plan to convert them into other currencies like USD or EUR, as long as we don't see a greater correction coming in. 
                                That's one reason, why this isn't an issue on our side (as your payment is more worth too) and it is at the same time a great way for your business
                                to save a lot of money when using our voucher system.
                            </>} />
                    </div>
                </div>
            </div>
        </div>
    </div>
}