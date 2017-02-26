import React from 'react'

import { Modal, Button, FormControl, FormGroup, ControlLabel, Glyphicon, Alert } from 'react-bootstrap'
import axios from 'axios'

class SignUpModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '', // The current username entered.
      password: '', // The current password entered.
      busy: false,  // Whether or not this component is waiting for data.
      error: ''     // The error message that should be displayed.
    };
  }

  signUp(e) {
    e.preventDefault();

    this.setState({busy: true});

    // Send login information to the server.
    /*
    axios.post('/api/user/login', {
        email: this.state.email,
        password: this.state.password
    }).then(function (r) {
      // If we succesfully logged in, then close this login window and pass on
      // the login data to whatever needs it.
      if (this.props.onLogin) {
        this.props.onLogin(r.data);
      }
      
      this.close();
    }.bind(this)).catch(function (e) {
      // Otherwise, keep this window open and show the login error.
      this.open();
      
      this.showError(e.response && e.response.data.message || e.error || "Unknown error!");
      this.setState({allowLogin: true, isLoggingIn: false});
    }.bind(this));
    */

    this.showError('Not implemented! Go away.');
    this.setState({busy: false});
  }

  showError(message) {
    this.setState({error: message});
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  render() {
    var errorPrompt;

    if (this.state.error.length > 0) {
      errorPrompt = (
        <Alert bsStyle="danger">
          <h4>Oh no!</h4>
          <p>{this.state.error}</p>
        </Alert>
      );
    }

    return (
      <div style={{display: 'inline'}}>
        <Modal show={this.props.show} onHide={this.props.onHide}>
          <Modal.Header closeButton>
              <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>

          <form onSubmit={!this.state.busy ? this.signUp.bind(this) : null}>
            <Modal.Body>
              {errorPrompt}
                <FormGroup id="email">
                  <ControlLabel>Email Address</ControlLabel>
                  <FormControl type="email"
                               placeholder="triton@ucsd.edu"
                               onChange={this.handleEmailChange.bind(this)} />
                </FormGroup>
                <FormGroup id="email">
                  <ControlLabel>Display Name</ControlLabel>
                  <FormControl type="text"
                               placeholder="Triton"
                               onChange={this.handleEmailChange.bind(this)} />
                </FormGroup>
                <FormGroup id="password">
                  <ControlLabel>Password</ControlLabel>
                  <FormControl type="password"
                               placeholder="Password"
                               onChange={this.handlePasswordChange.bind(this)} />
                </FormGroup>

                <FormGroup id="password">
                  <ControlLabel>Confirm Password</ControlLabel>
                  <FormControl type="password"
                               placeholder="Password"
                               onChange={this.handlePasswordChange.bind(this)} />
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="primary" type="submit" disabled={this.state.busy}>Sign Up</Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

SignUpModal.displayName = 'SignUpModal';

export default SignUpModal