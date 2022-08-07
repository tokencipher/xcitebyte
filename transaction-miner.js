// A transaction miner will do the job of mining new blocks whose data consists of a 
// set of transactions. The transaction miner will get these transactions from the 
// transaction pool. They're called miners because they are the individuals who pay
// the cost of computational power and do the work to find a valid hash for a new block.

// 1. Now the question is always why would a miner so generously spend their CPU to find 
// valid hashes. Well, by adding a new block to the blockchain, the transaction miner
// will receive an official mining reward from the blockchain system. 

// This reward is going to come in the form of a special transaction. A transaction will
// only have a single output which will be for the miners wallet. With an official mining
// reward value and the input is going to be a unique transaction input as well that all 
// the nodes are going to have the ability to recognize and validate. 

// This mining reward helps motivates workers to keeping adding new blocks to the chain. 
// It ensures that new transactions will eventually get recorded so that so as long as 
// there are motivated miners to drive the overall system. 

// Without the mining reward incentive, the blockchain growth would stagnate.

// 2. What functionality does a transaction miner need to achieve in order to properly
// mine a block of transactions. In their list of functionality there are going to be 5
// actions that a transaction miner needs to take in order to properly add a block of 
// transactions to the chain. 
//   1. It needs to grab all the valid transactions that are currently in the pool 
//     a. We're going to need a way to distinguish the well-formed transactions from the 
//        mal-formed ones since each transaction is user-contributed so we can't trust It
//        right away.
//   2. It should generate the miner's reward 
//     a. With a valid transaction and the official miner's reward, the miner has a list of 
//        valid transactions and the miners reward to then include within a newly mined block.
//   3. The miner will do the (CPU) work of finding a valid hash in that list of transactions.
//     a. With the valid hash found, we will then add the block consisting of the transactions 
//        as the data to the blockchain.
//   4. With a new block created, they will broadcast our updated blockchain to the entire network.
//     a. Everyone is going to respond, validate the new chain, and replace their blockchain arrays
//        with the now longest valid chain of blocks.
//   5. Clear the transaction pool now that the miner has already included the transaction data in the blockchain
//     a. Note that the miner only needs to clear the pools of its own node and not all the pools on
//        behalf of the other blockchain instances. This is to prevent exposing a way for the nodes to
//        arbitrarily clear everyone else's transaction pools. So, in order to make sure all pools are cleared
//        when a new block is mined, each blockchain instance is going to be responsible of clearing its
//        transaction pool for any new transaction that gets included in the overall blockchain. 
//        This is all in the effort to prevent the submission of transactions that have already been 
//        included in the chain. So, to make sure that this happens even more, we're going to add extra
//        validation on top of that, so that a transaction can't be recorded if it already exists in the 
//        blockchain history.

class TransactionMiner {
  constructor({blockchain, transactionPool, wallet, pubsub}) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.pubsub = pubsub;
  }
  
  mineTransactions() {
    // TODO: get the transaction pool's valid transactions

    // TODO: generate the miner's reward

    // TODO: add a block consisting of these transactions to the blockchain

    // TODO: broadcast the updated blockchain

    // TODO: clear the pool
  }
}

module.exports = TransactionMiner;