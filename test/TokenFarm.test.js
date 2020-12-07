const { assert } = require('console');

// const DaiToken = artifacts.require('DaiToken')
const WavectToken = artifacts.require('WavectToken')
const TokenFarm = artifacts.require('TokenFarm')

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('TokenFarm', ([owner, investor]) => {
    let wavectToken, tokenFarm
  
    before(async () => {
      // Load Contracts
      wavectToken = await WavectToken.new("Wavect Token", "WCT")
      tokenFarm = await TokenFarm.new(wavectToken.address)
  
      // Transfer all Dapp tokens to farm (1 million)
      await wavectToken.transfer(tokenFarm.address, tokens('1000000'))
    })

    describe('Wavect Token deployment', async () => {
      it('has a name', async () => {
        const name = await wavectToken.name()
        assert.equal(name, 'Wavect Token')
      })
    })
  
    describe('Token Farm deployment', async () => {
      it('has a name', async () => {
        const name = await tokenFarm.name()
        assert.equal(name, 'Wavect Token Farm')
      })
  
      it('contract has tokens', async () => {
        let balance = await wavectToken.balanceOf(tokenFarm.address)
        assert.equal(balance.toString(), tokens('1000000'))
      })
    })

    describe('Farming tokens', async () => {
        it('Has Ether Coins', async () => {
          // let expectedBalance = web3.utils.toBigNumber(tokens('100'));
          let actualBalance = await web3.eth.getBalance(investor);
          assert.notEqual(actualBalance, '0', "Investor needs some ETH!");
        })

        it('Stake ETH / Pay', async () => {
          ownerBalance = await web3.eth.getBalance(owner);
          withdrawnTokens = tokens('10');

          await tokenFarm.stakeTokens(withdrawnTokens, {
              from: investor,
              to: tokenFarm.address,
              value: withdrawnTokens
            });
       
            ownerBalance = await web3.eth.getBalance(owner) - ownerBalance;
            assert.equal(ownerBalance.toString(), withdrawnTokens, 'owner got paid by investor correctly');

            investorStaking = await tokenFarm.stakingBalance(investor);
            assert.equal(investorStaking.toString(), withdrawnTokens, 'investor staking balance correct after staking')
        })
  });
});

//     it('rewards investors for staking mDai tokens', async () => {
//       let result

//       // Check investor balance before staking
//       result = await daiToken.balanceOf(investor)
//       assert.equal(result.toString(), tokens('100'), 'investor Mock DAI wallet balance correct before staking')

//       // Stake Mock DAI Tokens
//       await daiToken.approve(tokenFarm.address, tokens('100'), { from: investor })
//       await tokenFarm.stakeTokens(tokens('100'), { from: investor })

//       // Check staking result
//       result = await daiToken.balanceOf(investor)
//       assert.equal(result.toString(), tokens('0'), 'investor Mock DAI wallet balance correct after staking')

//       result = await daiToken.balanceOf(tokenFarm.address)
//       assert.equal(result.toString(), tokens('100'), 'Token Farm Mock DAI balance correct after staking')

//       result = await tokenFarm.stakingBalance(investor)
//       assert.equal(result.toString(), tokens('100'), 'investor staking balance correct after staking')

//       result = await tokenFarm.isStaking(investor)
//       assert.equal(result.toString(), 'true', 'investor staking status correct after staking')

//       // Issue Tokens
//       await tokenFarm.issueTokens({ from: owner })

//       // Check balances after issuance
//       result = await dappToken.balanceOf(investor)
//       assert.equal(result.toString(), tokens('100'), 'investor DApp Token wallet balance correct affter issuance')

//       // Ensure that only onwer can issue tokens
//       await tokenFarm.issueTokens({ from: investor }).should.be.rejected;

//       // Unstake tokens
//       await tokenFarm.unstakeTokens({ from: investor })

//       // Check results after unstaking
//       result = await daiToken.balanceOf(investor)
//       assert.equal(result.toString(), tokens('100'), 'investor Mock DAI wallet balance correct after staking')

//       result = await daiToken.balanceOf(tokenFarm.address)
//       assert.equal(result.toString(), tokens('0'), 'Token Farm Mock DAI balance correct after staking')

//       result = await tokenFarm.stakingBalance(investor)
//       assert.equal(result.toString(), tokens('0'), 'investor staking balance correct after staking')

//       result = await tokenFarm.isStaking(investor)
//       assert.equal(result.toString(), 'false', 'investor staking status correct after staking')
//     })
//   })
// })
