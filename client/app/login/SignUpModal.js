import React from 'react'

import { Modal, Button, FormControl, FormGroup, ControlLabel, Glyphicon, Alert, HelpBlock } from 'react-bootstrap'
import axios from 'axios'

class SignUpModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',           // The current email address entered.
      username: '',        // The current username entered.
      password: '',        // The current password entered.
      passwordConfirm: '', // The current password confirm entered.
      busy: false,         // Whether or not this component is waiting for data.
      error: ''            // The error message that should be displayed.
    };
  }

  signUp(e) {
    e.preventDefault();

    if (this.getEmailValidationState() == 'error' ||
        this.getPasswordValidationState() == 'error' ||
        this.getUsernameValidationState() == 'error' ||
        this.getPasswordConfirmValidationState() == 'error') {
      this.showError('Please fix the errors on the form.');

      return;
    }

    this.setState({busy: true});
    this.showError('');

    // Send login information to the server.
    axios.post('/api/user', {
        email: this.state.email,
        password: this.state.password,
        username: this.state.username
    }).then((res) => {
      this.setState({
        busy: false,
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',
        error: ''
      });

      if (res.data && res.data.user) {
        if (this.props.onSignedUp) {
          this.props.onSignedUp(res.data.user);
          alert('Your account has been created. Please check your e-mail for an account verification link.');
        }
      } else {
        return Promise.reject('Unable to create an account!');
      }
    }).catch((error) => {
      console.error(error.response);

      if (error.response && error.response.data) {
          error = error.response.data.message || 'Unknown error!';
      }

      this.showError(error.toString());
      this.setState({busy: false});
    });
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

  handlePasswordConfirmChange(e) {
    this.setState({passwordConfirm: e.target.value});
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  getEmailValidationState() {
    // Regular expression for matching e-mail addresses.
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (re.test(this.state.email)) {
      return 'success';
    }

    return 'error';
  }

  getUsernameValidationState() {
    if (this.state.username.length >= 2) {
      return 'success';
    }

    return 'error';
  }

  getPasswordValidationState() {
    const length = this.state.password.length;

    if (length >= 4) {
      return 'success';
    }

    return 'error';
  }

  getPasswordConfirmValidationState() {
    if (this.state.passwordConfirm.length >= 4 &&
        this.state.password === this.state.passwordConfirm) {
      return 'success';
    }

    return 'error';
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
                <FormGroup id="email" validationState={this.getEmailValidationState()}>
                  <ControlLabel>Email Address</ControlLabel>
                  <FormControl type="email"
                               placeholder="triton@ucsd.edu"
                               onChange={this.handleEmailChange.bind(this)} />
                </FormGroup>
                <FormGroup id="email" validationState={this.getUsernameValidationState()}>
                  <ControlLabel>Display Name</ControlLabel>
                  <FormControl type="text"
                               placeholder="Triton"
                               onChange={this.handleUsernameChange.bind(this)} />
                  <HelpBlock>Usernames must contain at least 2 characters.</HelpBlock>
                </FormGroup>

                <FormGroup id="password" validationState={this.getPasswordValidationState()}>
                  <ControlLabel>Password</ControlLabel>
                  <FormControl type="password"
                               placeholder="Password"
                               onChange={this.handlePasswordChange.bind(this)} />
                  <HelpBlock>Passwords must be at least 4 characters long.</HelpBlock>
                </FormGroup>

                <FormGroup id="password" validationState={this.getPasswordConfirmValidationState()}>
                  <ControlLabel>Re-enter Password</ControlLabel>
                  <FormControl type="password"
                               placeholder="Password"
                               onChange={this.handlePasswordConfirmChange.bind(this)} />
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