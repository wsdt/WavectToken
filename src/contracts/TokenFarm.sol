pragma solidity ^0.6.0;

import "./WavectToken.sol";
// import "./DaiToken.sol";

contract TokenFarm {
    string public name = "Wavect Token Farm";
    address payable public owner;
    WavectToken public wavectToken;
    // DaiToken public daiToken;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(WavectToken _wavectToken/*, DaiToken _daiToken*/) public {
        wavectToken = _wavectToken;
        // daiToken = _daiToken;
        owner = payable(msg.sender);
    }

    function stakeTokens(uint _amount) public payable {
        // Require amount greater than 0
        require(_amount > 0, "amount cannot be 0");

        // 1 WACT = 1 ETH
        uint wactBalance = wavectToken.balanceOf(msg.sender);
        if (wactBalance > _amount) {
            // wavectToken.transfer(address(this), _amount);
            // wavectToken.approve(msg.sender, _amount);
            // wavectToken.approve(address(this), _amount);
            wavectToken.transferFrom(msg.sender, address(this), _amount); // transfer wact tokens back to owner
            // stakingBalance[msg.sender] -= _amount; // reduce staking balance (to reduce amount of WACT tokens issued)
            _amount = 0; // nothing more to pay
        } else {
            if (wactBalance > 0) {
                // wavectToken.transfer(address(this), wactBalance);
                // wavectToken.approve(msg.sender, wactBalance);
                //wavectToken.approve(address(this), wactBalance);
                wavectToken.transferFrom(msg.sender, address(this), wactBalance); // use all available WACT tokens
                // stakingBalance[msg.sender] = 0; // no wact tokens left
                _amount -= wactBalance; // reduce ETH invoice
            }

            if (_amount > 0) {
                // no need to transfer ETH if _amount = 0
                owner.transfer(_amount); // transfer to private acc.

                // Update staking balance (only needed if _amount > 0)
                stakingBalance[msg.sender] += _amount;
            }
        }

        // Add user to stakers array *only* if they haven't staked already
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Issuing Tokens
    function issueTokens(uint wactTokenDivisor) public {
        // Only owner can call this function
        require(msg.sender == owner, "caller must be the owner");

        // Issue tokens to all stakers
        for (uint i=0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if(balance > 0) {
                wavectToken.transfer(recipient, balance / wactTokenDivisor);
            }
        }
    }

    // Issue Tokens/Rebate to customer
    function issueTokensToCustomer(address recipient, uint wactTokenDivisor) public {
        // Only owner can call this function
        require(msg.sender == owner, "caller must be the owner");

        uint balance = stakingBalance[recipient];
        if(balance > 0) {
            wavectToken.transfer(recipient, balance / wactTokenDivisor);
        }
    }
}
