import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/mock-logo-2.png'; 

class App extends Component {
  state = { walletInfo: {}};

  // fires as soon as the component has been inserted into the main document
  // allows us to run the request without having to block the presentation appearing 
  // to the user within the render method
  componentDidMount() {
    fetch(`${document.location.origin}/api/wallet-info`)
      .then(response => response.json())
      .then(json => this.setState({walletInfo: json}))
  }

  // returns JSX
  render() {
    const {address, balance} = this.state.walletInfo;

    return (
      <div className='App'>
        <img className='logo' src={logo}></img>
        <br />
        <div>Welcome to the blockchain...</div>
        <br />
        <div><Link to='/blocks'>Blocks</Link></div>
        <div><Link to='/conduct-transaction'>Conduct a transaction</Link></div>
        <div><Link to='/transaction-pool'>Transaction pool</Link></div>
        <br />
        <div className='WalletInfo'>
          <div>Address: {address}</div>
          <div>Balance: {balance}</div>
        </div>
      </div>
    )
  }
}

export default App;