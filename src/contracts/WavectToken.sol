pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WavectToken is ERC20 {
      constructor (string memory name, string memory symbol)
        ERC20(name, symbol)
        public
    {
        //_mint(_msgSender(), 1000000000000000000000000);
        _mint(msg.sender, 1000000000000000000000000);
    }
}

// contract WavectToken {
//     string  public name = "Wavect Token";
//     string  public symbol = "WACT";
//     uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
//     uint8   public decimals = 18;

//     event Transfer(
//         address indexed _from,
//         address indexed _to,
//         uint256 _value
//     );

//     event Approval(
//         address indexed _owner,
//         address indexed _spender,
//         uint256 _value
//     );

//     mapping(address => uint256) public balanceOf;
//     mapping(address => mapping(address => uint256)) public allowance;

//     constructor() public {
//         balanceOf[msg.sender] = totalSupply;
//     }

//     function transfer(address _to, uint256 _value) public returns (bool success) {
//         require(balanceOf[msg.sender] >= _value);
//         balanceOf[msg.sender] -= _value;
//         balanceOf[_to] += _value;
//         emit Transfer(msg.sender, _to, _value);
//         return true;
//     }

//     function approve(address _spender, uint256 _value) public returns (bool success) {
//         allowance[msg.sender][_spender] = _value;
//         emit Approval(msg.sender, _spender, _value);
//         return true;
//     }

//     function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
//         require(_value <= balanceOf[_from]);
//         require(_value <= allowance[_from][msg.sender]);
//         balanceOf[_from] -= _value;
//         balanceOf[_to] += _value;
//         allowance[_from][msg.sender] -= _value;
//         emit Transfer(_from, _to, _value);
//         return true;
//     }
// }
