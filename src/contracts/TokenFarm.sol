pragma solidity ^0.6.0;

import "./WavectToken.sol";

contract TokenFarm {
    using SafeMath for uint256;

    string public name = "Wavect Token Farm";
    address payable public owner;
    WavectToken public wavectToken;

    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bytes32[]) public invoiceReferences; // use bytes32 instead of string to save gas

    constructor(WavectToken _wavectToken) public {
        wavectToken = _wavectToken;
        owner = payable(msg.sender);
    }

    function stakeTokens(uint256 _amount, bytes32 _invoiceReference) public payable {
        // Require amount greater than 0
        require(_amount > 0, "amount cannot be 0");
        require(_invoiceReference.length > 0, "add a invoiceReference");
        require(_invoiceReference.length <= 32, "invoiceReference must not have more than 32 chars");

        // 1 WACT = 1 ETH
        uint256 wactBalance = wavectToken.balanceOf(msg.sender);
        if (wactBalance > _amount) {
            wavectToken.transferFrom(msg.sender, address(this), _amount); // transfer wact tokens back to owner
            _amount = 0; // nothing more to pay
        } else {
            if (wactBalance > 0) {
                wavectToken.transferFrom(msg.sender, address(this), wactBalance); // use all available WACT tokens
                _amount = _amount.sub(wactBalance); // reduce ETH invoice
            }

            if (_amount > 0) {
                // no need to transfer ETH if _amount = 0
                owner.transfer(_amount); // transfer to private acc.

                // Update staking balance (only needed if _amount > 0)
                stakingBalance[msg.sender] = stakingBalance[msg.sender].add(_amount);
            }
        }

        // Add user to stakers array *only* if they haven't staked already
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking status
        hasStaked[msg.sender] = true;
        invoiceReferences[msg.sender].push(_invoiceReference);
    }

    // Issuing Tokens
    function issueTokens(uint256 wactTokenDivisor) public {
        // Only owner can call this function
        require(msg.sender == owner, "caller must be the owner");

        // Issue tokens to all stakers
        for (uint256 i=0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient];
            if(balance > 0) {
                wavectToken.transfer(recipient, balance.div(wactTokenDivisor));
            }
        }
    }

    // Issue Tokens/Rebate to customer
    function issueTokensToCustomer(address recipient, uint256 wactTokenDivisor) public {
        // Only owner can call this function
        require(msg.sender == owner, "caller must be the owner");

        uint256 balance = stakingBalance[recipient];
        if(balance > 0) {
            wavectToken.transfer(recipient, balance.div(wactTokenDivisor));
        }
    }
}
