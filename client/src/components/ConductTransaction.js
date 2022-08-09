import React, { Component } from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

class ConductTransaction extends Component {
  state = { recipient: '', amount: 0, knownAddresses: [] };

  componentDidMount() {
    fetch(`${document.location.origin}/api/known-addresses`)
      .then(response => response.json())
      .then(json => this.setState({knownAddresses: json}));
  }

  updateRecipient = event => {
    this.setState({recipient: event.target.value});
  }

  updateAmount = event => {
    this.setState({amount: Number(event.target.value)});
  }

  conductTransaction = () => {
    const {recipient, amount} = this.state;

    fetch(`${document.location.origin}/api/transact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({recipient, amount})
    }).then(response => response.json())
      .then(json => {
        console.log(json);
      }
    );
  }

  render() {

    return (
      <div className='ConductTransaction'>
        <Link to='/'>Home</Link>
        <h3>Conduct a Transaction</h3>
        <br />
        <h4>Known Addresses</h4>
        {
          this.state.knownAddresses.map(knownAddress => {
            return (
              <div key={knownAddress}>
                <div>{knownAddress}</div>
                <br />
              </div>
            )
          })
        }
        <br />
        <FormGroup>
          <FormControl 
            input="text" 
            placeholder="recipient" 
            value={this.state.recipient}
            onChange={this.updateRecipient}
          />
        </FormGroup>
        <br />
        <FormGroup>
        <FormControl 
            input="number" 
            placeholder="amount" 
            value={this.state.amount}
            onChange={this.updateAmount}
          />
        </FormGroup>
        <br />
        <div>
          <Button 
            bsStyle="danger"
            onClick={this.conductTransaction}>
              Submit
          </Button>
        </div>
      </div>
    )
  }
}

export default ConductTransaction;