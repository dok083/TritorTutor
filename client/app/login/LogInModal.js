import React from 'react'

import { Modal, Button, FormControl, FormGroup, ControlLabel, Glyphicon, Alert } from 'react-bootstrap'
import axios from 'axios'

const gary = {userID: 0, username: 'Gary Gillespie'};

class LogInModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',         // The current username entered.
      password: '',         // The current password entered.
      busy: false,          // Whether or not this component is waiting for data.
      error: '',            // The error message that should be displayed.
      forgotPassword: false // Whether or not we are resetting a password.
    };
  }

  login(e) {
    e.preventDefault();

    if (this.state.forgotPassword) {
      this.resetPassword();

      return;
    }

    this.setState({busy: true});

    // Send login information to the server.
    axios.post('/api/user/login', {
        email: this.state.email,
        password: this.state.password
    }).then((res) => {
      this.setState({busy: false});
      console.log(res);
      if (!res.data) {
        this.showError('Unknown error!');

        return;
      }

      // If we succesfully logged in, then close this login window and pass on
      // the login data to whatever needs it.
      if (this.props.onLoggedIn) {
        this.props.onLoggedIn(res.data);
      }
    })
    .catch((e) => {
      this.showError(e.response && e.response.data.message || e.error || "Unknown error!");
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

  resetPassword() {
    this.hideForgotPassword();
    alert('An e-mail has been sent containing a password reset link.');
  }

  showForgotPassword() {
    this.setState({forgotPassword: true});
  }

  hideForgotPassword() {
    this.setState({forgotPassword: false});
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

    var password;

    if (!this.state.forgotPassword) {
      password = [
        <FormGroup id="password">
          <ControlLabel>Password</ControlLabel>
          <FormControl type="password"
                       placeholder="Password"
                       onChange={this.handlePasswordChange.bind(this)} />
        </FormGroup>,
        <a onClick={this.showForgotPassword.bind(this)}>Forgot password?</a>
      ];
    } else {
      password = (
        <a onClick={this.hideForgotPassword.bind(this)}>Back to login</a>
      );
    }

    return (
      <div style={{display: 'inline'}}>
        <Modal show={this.props.show} onHide={this.props.onHide}>
          <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <form onSubmit={!this.state.busy ? this.login.bind(this) : null}>
            <Modal.Body>
              {errorPrompt}
                <FormGroup id="email">
                  <ControlLabel>Email Address</ControlLabel>
                  <FormControl type="email"
                               placeholder="triton@ucsd.edu"
                               onChange={this.handleEmailChange.bind(this)} />
                </FormGroup>

                {password}
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="primary" type="submit" disabled={this.state.busy}>
                {this.state.forgotPassword ? 'Reset Password' : 'Login'}
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

LogInModal.displayName = 'LogInModal';

export default LogInModal