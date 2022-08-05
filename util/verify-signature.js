const cryptoHash = require('./crypto-hash');
const ec = require('./elliptic-curve');

const verifySignature = ({ publicKey, data, signature }) => {
  const keyFromPublic = ec.keyFromPublic(publicKey, 'hex');

  return keyFromPublic.verify(cryptoHash(data), signature);
};

module.exports = verifySignature;