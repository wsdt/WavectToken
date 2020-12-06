// const DappToken = artifacts.require('DappToken')
const WavectToken = artifacts.require('WavectToken')
const TokenFarm = artifacts.require('TokenFarm')

module.exports = async function(deployer, network, accounts) {
  // Deploy Mock DAI Token
  // await deployer.deploy(DaiToken)
  // const daiToken = await DaiToken.deployed()

  // Deploy Wavect Token
  await deployer.deploy(WavectToken, "Wavect Token", "WACT")
  const wavectToken = await WavectToken.deployed()

  // Deploy TokenFarm
  await deployer.deploy(TokenFarm, wavectToken.address/*, daiToken.address*/)
  const tokenFarm = await TokenFarm.deployed()

  // Transfer all tokens to TokenFarm (1 million)
  await wavectToken.transfer(tokenFarm.address, '1000000000000000000000000')

  // Transfer 100 Mock DAI tokens to investor
  // await daiToken.transfer(accounts[1], '100000000000000000000')
}
