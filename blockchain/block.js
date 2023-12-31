const hexToBinary = require('hex-to-binary');
const { GENESIS_DATA, MINE_RATE } = require('../config');
const cryptoHash = require('../util/crypto-hash');

class Block {
  constructor({timestamp, lastHash, hash, data, nonce, difficulty}) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static genesis() {
    return new Block(GENESIS_DATA);
  }

  /**  
   * We named this method `mineBlock` to represent the fact that
   * creating a block requires computational work in order to allow 
   * the blockchain to grow at a reasonable pace.
   * 
   * Each block should meet a level of difficulty when generating its hash.
   * The higher this difficulty gets, the more computational power it will 
   * take a miner to actually add a block to chain because they're going to 
   * have to generate more and more valid hashes in order to find that valid
   * block.
   * 
   * We want the difficulty to be dynamic so this will allow the system according
   * to self adjust according to a certain mining rate that we want new blocks to be
   * added to the chain.
   * 
   * If a block is mined too quickly, we should raise the difficulty and make this 
   * requirement harder to meet. 
   * 
   * If blocks are mined too slowly then we'll lower the difficulty overall so that way
   * its easier to meet the difficulty requirement so this constant difficulty adjustment
   * will make sure that, on average, blocks are added at a reasonable pace.
   */
  static mineBlock({ lastBlock, data }) {
    let hash, timestamp;
    const lastHash = lastBlock.hash;
    let { difficulty } = lastBlock;
    let nonce = 0;

    // The difficulty for each newly mined block will adjust based on how long it took to
    // find the valid hash compared to the MINE_RATE.

    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty({originalBlock: lastBlock, timestamp })
      hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty)
    } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this({timestamp, lastHash, data, difficulty, nonce, hash});
  }

  static adjustDifficulty({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock;

    if (difficulty < 1) {
      return 1;
    }

    if ((timestamp - originalBlock.timestamp) > MINE_RATE) {
       return difficulty - 1;
    }

    return difficulty + 1;
  }
}

/**
 * const block1 = new Block(
 *   {
 *     timestamp: '01/01/01', 
 *     lastHash: 'foo-lastHash', 
 *     hash: 'foo-hash', 
 *     data: 'foo-data'
 *   }
 * );
 */

//console.log('block1', block1)

module.exports = Block;