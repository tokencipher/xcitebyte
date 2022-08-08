import React, { Component } from 'react';

class App extends Component {
  state = { walletInfo: {}};

  // fires as soon as the component has been inserted into the main document
  // allows us to run the request without having to block the presentation appearing 
  // to the user within the render method
  componentDidMount() {
    fetch('http://localhost:3000/api/wallet-info')
      .then(response => response.json())
      .then(json => this.setState({walletInfo: json}))
  }

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