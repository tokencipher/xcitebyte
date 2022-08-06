const uuid = require('uuid/v1');
const verifySignature = require('../util/verify-signature');
//const Wallet = require('./wallet');

class Transaction {
  constructor({ senderWallet, recipient, amount }) {
    this.id = uuid();
    this.outputMap = this.createOutputMap({senderWallet, recipient, amount});
    this.input = this.createInput({senderWallet, outputMap: this.outputMap});
  }

  createOutputMap({ senderWallet, recipient, amount }) {
    const outputMap = {};

    outputMap[recipient] = amount;
    outputMap[senderWallet.publicKey] = senderWallet.balance - amount;

    return outputMap;
  }

  createInput({senderWallet, outputMap}) {
    return {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(outputMap)
    };
  }

  // JS will always treat the same object instance as equal even if 
  // its properties have changed. So, in this case its affecting our
  // result for the senderWallet.sign()
  //
  // Two references to the same object in JS are always going to be 
  // treated as equal even if the properties in that object has 
  // changed in one of the references
  update({senderWallet, recipient, amount}) {
    this.outputMap[recipient] = amount;

    this.outputMap[senderWallet.publicKey] = 
      this.outputMap[senderWallet.publicKey] - amount;

    this.input = this.createInput({senderWallet, outputMap: this.outputMap});
  }

  static validTransaction(transaction) {
    const { input: { address, amount, signature }, outputMap } = transaction;

    console.log(Object.values(outputMap))

    const outputTotal = Object.values(outputMap)
      .reduce((total, outputAmount) => total + outputAmount);

    if (amount !== outputTotal) {
      console.error(`Invalid transaction from ${address}`);
      return false;
    }

    if (!verifySignature({ publicKey: address, data: outputMap, signature})) {
      console.error(`Invalid signature from ${address}`);
      return false;
    }

    return true;
  }
}

/*
senderWallet = new Wallet();
recipient = 'recipient-public-key';
amount = 50;

transaction = new Transaction({ senderWallet, recipient, amount });
Transaction.validTransaction(transaction);
*/

module.exports = Transaction;