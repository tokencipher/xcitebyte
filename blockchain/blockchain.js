const Block = require('./block');
const cryptoHash = require('../util/crypto-hash');

/**
 * The goal of the blockchain network is that they all come to a 
 * unanimous agreement on the true longest and valid blockchain.
 * 
 * And this is the power of the blockchain. multiple nodes have now
 * come to an agreement on an official set of blocks. That blockchain
 * is now distributed and public across all the nodes. And everyone
 * has an equal stake in maintaining that valid blockchain. Plus, its
 * decentralized. There's not one entity with the responsibility of 
 * managing all of the data and therefore having all the power of the
 * entire system.
 * 
 * All of this wouldn't be possible without chain validation and 
 * replacement
 * 
 * The power of the blockchain shines when multiple instances of a 
 * blockchain application works together like a wolfpack.
 * 
 * When multiple blockchains are interacting like this, we're calling
 * this the blockchain network.
 * 
 * Miners must spend computational power in order to mine a block.
 * This deters hackers from trying to rewrite the entire blockchain
 * history with corrupt and invalid data. It's going to be financially
 * expensive for them to try.
 * 
 * By continually adjusting the nonce value, a miner can keep generating valid
 * hashes for the current block until they find one that satisfies the difficulty.
 * 
 * So, the nonce value starts at 0 and it increments upwards until a nonce is used that
 * has a matching number of leading zeroes according to the set difficulty.
 * 
 * Overall, this act of generating new hashes with changing nonce values takes a decent 
 * amount of computational work. Hence, finding a nonce that unlocks a hash that meets
 * the difficulty requirement is that very proof of work.
 * 
 * The term nonce originates from the 'Number used once' shortened multiple times.
 * 
 * So, you use the number once and then change n to something else and keep using it once
 * until you get a valid hash.
 * 
 * Overall, finding the right combination of the data, nonce, and lastHash to meet the leading
 * zeroes requirement takes quite a bit of computational work.
 * 
 * The 51% Attack is a scenario where a dishonest miner has more than at least 51% of the 
 * computing power of the entire blockchain network. Thus, they would have the power to 
 * replace the current blockchain with one in their favor. Because they can dominate the
 * entire network. 
 * 
 * They can generate a long enough blockchain that has solved enough proof of work puzzles 
 * in order to generate a valid blockchain that everyone else is just going to have to accept.
 * Since, collectively they only control 49% of the blockchain computing power.
 * 
 * This Proof of Work system makes such a scenario so computationally expensive that it's 
 * ridiculous to spend the cost in order to try and benefit from taking over the blockchain
 * 
 * Blockchain-powered Cryptocurrencies
 * 
 * Contain wallet objects
 * Generate keys for digital signatures and verification
 * Have transaction objects to represent currency exchange
 */

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data
    });

    this.chain.push(newBlock);
  }

  replaceChain(chain) {
    if (chain.length <= this.chain.length) {
      console.error('The incoming chain must be longer')
      return;
    }

    if (!Blockchain.isValidChain(chain)) {
      console.error('The incoming chain must be valid')
      return;
    }

    console.log('replacing chain with', chain);
    this.chain = chain;
  }

  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, lastHash, hash, nonce, difficulty, data } = chain[i];
      const actualLastHash = chain[i-1].hash;
      const lastDifficulty = chain[i-1].difficulty;

      if (lastHash !== actualLastHash) return false;

      const validatedHash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);

      if (hash !== validatedHash) return false;

      if (Math.abs(lastDifficulty - difficulty) > 1) return false;
    }

    return true;
  }
}

module.exports = Blockchain;