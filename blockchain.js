const Block = require('./block');
const cryptoHash = require('./crypto-hash');

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
      const { timestamp, lastHash, hash, data } = chain[i];

      const actualLastHash = chain[i-1].hash;

      if (lastHash !== actualLastHash) return false;

      const validatedHash = cryptoHash(timestamp, lastHash, data);

      if (hash !== validatedHash) return false;
    }

    return true;
  }
}

module.exports = Blockchain;