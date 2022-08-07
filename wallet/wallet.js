const Transaction = require('./transaction');
const { STARTING_BALANCE } = require('../config');
const cryptoHash = require('../util/crypto-hash');
const ec  = require('../util/elliptic-curve');

class Wallet {
  constructor() {
    this.balance = STARTING_BALANCE;

    this.keyPair = ec.genKeyPair();

    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  sign(data) {
    return this.keyPair.sign(cryptoHash(data));
  }

  createTransaction({recipient, amount, chain}) {
    if (chain) {
      this.balance = Wallet.calculateBalance({
        chain,
        address: this.publicKey
      });
    }

    if (amount > this.balance) {
      throw new Error('Amount exceeds balance');
    }

    return new Transaction({senderWallet: this, recipient, amount});
  }

  static calculateBalance({chain, address}) {
    let outputsTotal = 0;

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];

      for (let transaction of block.data) {
        const addressOutput = transaction.outputMap[address];

        if (addressOutput) {
          outputsTotal += addressOutput;
        }
      }
    }

    return STARTING_BALANCE + outputsTotal;
  }
}

module.exports = Wallet;