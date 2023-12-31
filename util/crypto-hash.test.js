const cryptoHash = require('./crypto-hash');

describe('cryptoHash()', () => {
  const hash = '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae';
  const jsonFooHash = 'b2213295d564916f89a6a42455567c87c3f480fcd7a1c15e220f17d7169a790b';

  it('generates a SHA-256 hashed output', () => {
    expect(cryptoHash('foo'))
      .toEqual(jsonFooHash);
  });

  it('produces the same hash with the same input arguments in any order', () => {
    expect(cryptoHash('one', 'two', 'three'))
      .toEqual(cryptoHash('three', 'two', 'one'))
  });

  it('produces a unique hash when the properties have changed on an input', () => {
    // We want to make sure the hash is unique for any object that contains new 
    // properties even if its the same underlying object
    const foo = {};
    const originalHash = cryptoHash(foo);
    foo['a'] = 'a';

    expect(cryptoHash(foo)).not.toEqual(originalHash);
  });
});