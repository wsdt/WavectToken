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
          investorBalance = await web3.eth.getBalance(investor);
          withdrawnTokens = tokens('10');

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
            // assert.equal(investorBalance, withdrawnTokens, 'investor has not paid owner correctly');

            ownerBalance = await web3.eth.getBalance(owner) - ownerBalance;
            assert.equal(ownerBalance.toString(), withdrawnTokens, 'owner has not been pay by investor correctly');

            investorStaking = await tokenFarm.stakingBalance(investor);
            assert.equal(investorStaking.toString(), withdrawnTokens, 'investor staking balance not correct after staking')
        
            await tokenFarm.issueTokens(100); // issue tokens to all customers / stakers
            newInvestorWACTBalance = await wavectToken.balanceOf(investor);
            assert.notEqual(newInvestorWACTBalance.toString(), investorWACTBalance.toString(), 'WACT balance of investor did not change!');
            assert.equal((newInvestorWACTBalance-investorWACTBalance).toString(), (withdrawnTokens / 100).toString(), 'Investor did not receive correct amount of WACT tokens');
         })
  });
});
