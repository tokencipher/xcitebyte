import React, { Component } from 'react';

class App extends Component {
  state = { walletInfo: { address: 'fooxv6', balance: 9999 }};

  // returns JSX
  render() {
    const {address, balance} = this.state.walletInfo;
    return (
      <div>
        <div>Welcome to the blockchain...</div>
        <div>Address: {address}</div>
        <div>Balance: {balance}</div>
      </div>
    )
  }
}

export default App;