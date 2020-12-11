//const { assert } = require('console');
const assert = require('assert').strict;

// const DaiToken = artifacts.require('DaiToken')
const WavectToken = artifacts.require('WavectToken')
const TokenFarm = artifacts.require('TokenFarm')

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

function toETHFromWei(n) {
  return web3.utils.fromWei(n, 'Ether');
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
          tokenFarmWACTBalance = await wavectToken.balanceOf(tokenFarm.address);
          ownerBalance = await web3.eth.getBalance(owner);
          investorBalance = await web3.eth.getBalance(investor);
          withdrawnTokens = tokens('1');
          
          assert.notEqual(tokenFarmWACTBalance.toString(), '0', 'TokenFarm WACT balance must not be 0.')
          investorWACTBalance = await wavectToken.balanceOf(investor);
          // TODO: Maybe remove assert here
          assert.equal(investorWACTBalance.toString(), '0', 'Investor should not have any WACT tokens yet.');

          await tokenFarm.stakeTokens(withdrawnTokens, {
              from: investor,
              to: tokenFarm.address,
              value: withdrawnTokens,
            });

            investorBalance = investorBalance - await web3.eth.getBalance(investor);
            // 3000000000000000 average gas paid
            assert.ok((withdrawnTokens+3000000000000000) > investorBalance, 'investor has not paid owner correctly')
            
            ownerBalance = await web3.eth.getBalance(owner) - ownerBalance;
            assert.equal(ownerBalance.toString(), withdrawnTokens, 'owner has not been paid by investor correctly');

            investorStaking = await tokenFarm.stakingBalance(investor);
            assert.equal(investorStaking.toString(), withdrawnTokens, 'investor staking balance not correct after staking')
        
            divisor = 100;
            await tokenFarm.issueTokens(divisor.toString()); // issue tokens to all customers / stakers
            newInvestorWACTBalance = await wavectToken.balanceOf(investor);
            assert.notEqual(newInvestorWACTBalance.toString(), investorWACTBalance.toString(), 'WACT balance of investor did not change!');
            assert.equal((newInvestorWACTBalance-investorWACTBalance).toString(), (withdrawnTokens/divisor).toString(), 'Investor did not receive correct amount of WACT tokens');

            ownerBalance = await web3.eth.getBalance(owner);
            investorBalance = await web3.eth.getBalance(investor);
        
            // Needed for transferFrom (from: investor needed as investor needs to grant it)
            await wavectToken.increaseAllowance(tokenFarm.address, withdrawnTokens, {from: investor}) 

            // 2nd invoice
            await tokenFarm.stakeTokens(withdrawnTokens, {
              from: investor,
              to: tokenFarm.address,
              value: withdrawnTokens,
            });
        
            investorBalance = investorBalance - await web3.eth.getBalance(investor);
            // 3000000000000000 average gas paid
            assert.ok((withdrawnTokens+3000000000000000) > investorBalance, 'investor has not paid owner correctly when using WACT tokens')
            
            ownerBalance = await web3.eth.getBalance(owner) - ownerBalance;
            assert.equal(ownerBalance.toString(), (withdrawnTokens - (withdrawnTokens/divisor)).toString(), 'owner has not been paid by investor correctly when using WACT tokens');

            investorStaking = await tokenFarm.stakingBalance(investor);
            assert.equal(investorStaking.toString(), (withdrawnTokens * 2 - withdrawnTokens/divisor).toString(), 'investor staking balance not correct after staking with WACT tokens')
        
            newTokenFarmWACTBalance = await wavectToken.balanceOf(tokenFarm.address);
            assert.equal(tokenFarmWACTBalance.toString(), newTokenFarmWACTBalance.toString(), 'TokenFarm should have all WACT tokens again.');

            oldWACTBalance = newInvestorWACTBalance
            newInvestorWACTBalance = await wavectToken.balanceOf(investor);
            assert.notEqual(oldWACTBalance.toString(), newInvestorWACTBalance.toString(), 'WACT balance did not change!');
            assert.equal(newInvestorWACTBalance.toString(), (oldWACTBalance-(withdrawnTokens/divisor)).toString(), `Investor should have used his WACT tokens! Left: ${newInvestorWACTBalance.toString()}, Expected: ${(oldWACTBalance-(withdrawnTokens/divisor))}`);
          })
  });
});
