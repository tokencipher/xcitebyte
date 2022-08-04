const { GENESIS_DATA } = require('./config');

class Block {
  constructor({timestamp, lastHash, hash, data}) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  static genesis() {
    return new Block(GENESIS_DATA);
  }

  /**  
   * We named this method `mineBlock` to represent the fact that
   * creating a block requires computational work in order to allow 
   * the blockchain to grow at a reasonable pace.
   */
  static mineBlock({ lastBlock, data }) {
    return new this({
      timestamp: Date.now(),
      lastHash: lastBlock.hash,
      data
    });
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