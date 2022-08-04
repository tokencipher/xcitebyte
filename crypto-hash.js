const crypto = require('crypto');

const cryptoHash = (...inputs) => {
  const hash = crypto.createHash('sha256');

  hash.update(inputs.sort().join(' '));

  // `Digest` is a term in cryptography that represents the result of a hash.
  return hash.digest('hex');
};

module.exports = cryptoHash;