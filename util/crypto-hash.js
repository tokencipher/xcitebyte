const crypto = require('crypto');

const cryptoHash = (...inputs) => {
  const hash = crypto.createHash('sha256');

  // we're mapping over the inputs and turning the inner items to their 
  // stringified form
  hash.update(inputs.map(input => JSON.stringify(input)).sort().join(' '));

  // `Digest` is a term in cryptography that represents the result of a hash.
  return hash.digest('hex');
};

module.exports = cryptoHash;