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

        

        // Trasnfer Mock Dai tokens to this contract for staking
        // daiToken.transferFrom(msg.sender, address(this), _amount);
        // daiToken.transferFrom(msg.sender, address(this), _amount);
        // owner.transfer(address(this).balance); // tansfer to private acc.
        // require(address(this).balance > 0, "balance too low");
        owner.transfer(_amount); // transfer to private acc.
        // bool res = owner.call.value(_amount).gas(20317)();
        // require(res, "ETH not transferred to Wavect");

        // Update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // Add user to stakers array *only* if they haven't staked already
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Unstaking Tokens (Withdraw)
    // function unstakeTokens() public {
    //     // Fetch staking balance
    //     uint balance = stakingBalance[msg.sender];

    //     // Require amount greater than 0
    //     require(balance > 0, "staking balance cannot be 0");

    //     // Transfer Mock Dai tokens to this contract for staking
    //     daiToken.transfer(msg.sender, balance);

    //     // Reset staking balance
    //     stakingBalance[msg.sender] = 0;

    //     // Update staking status
    //     isStaking[msg.sender] = false;
    // }

    // Issuing Tokens
    function issueTokens() public {
        // Only owner can call this function
        require(msg.sender == owner, "caller must be the owner");

        // Issue tokens to all stakers
        for (uint i=0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if(balance > 0) {
                wavectToken.transfer(recipient, balance);
            }
        }
    }

    // Issue Tokens/Rebate to customer
    function issueTokensToCustomer(address recipient) public {
        // Only owner can call this function
        require(msg.sender == owner, "caller must be the owner");

        uint balance = stakingBalance[recipient];
        if(balance > 0) {
            wavectToken.transfer(recipient, balance);
        }
    }
}
