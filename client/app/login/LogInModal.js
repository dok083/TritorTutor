import React from 'react'

import { Modal, Button, FormControl, FormGroup, ControlLabel, Glyphicon, Alert } from 'react-bootstrap'
import axios from 'axios'

class LogInModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',            // The current email entered.
      password: '',         // The current password entered.
      busy: false,          // Whether or not this component is waiting for data.
      error: '',            // The error message that should be displayed.
      forgotPassword: false // Whether or not we are resetting a password.
    };
  }

  login(e) {
    e.preventDefault();

    if (!this.isValidEmail()) {
      return;
    }

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
      this.showError(e.response && e.response.data.message || e.response.data.toString() || "Unknown error!");
      this.setState({busy: false});
    });
  }

  onHide() {
    this.setState({
      email: '',
      password: '',
      busy: false,
      error: '',
      forgotPassword: false
    });

    if (this.props.onHide) {
      this.props.onHide();
    }
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

  isValidEmail() {
    // Regular expression for matching e-mail addresses.
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return re.test(this.state.email);
  }

  resetPassword() {
    if (!this.isValidEmail()) {
      return;
    }

    this.setState({busy: true});

    axios.post('/api/reset-password', {email: this.state.email})
      .then(() => {
        this.setState({busy: false});
        this.hideForgotPassword();

        alert('An e-mail has been sent containing a password reset link.');
      })
      .catch((error) => {
        var message = error.response && error.response.data;

        if (message.message) {
          message = message.message;
        } else {
          message = error.toString();
        }

        this.showError(message);
        this.setState({busy: false});
      });
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
        <FormGroup id="password" key="password">
          <ControlLabel>Password</ControlLabel>
          <FormControl type="password"
                       placeholder="Password"
                       onChange={this.handlePasswordChange.bind(this)}
                       required />
        </FormGroup>,
        <a onClick={this.showForgotPassword.bind(this)} key="forgot">Forgot password?</a>
      ];
    } else {
      password = (
        <a onClick={this.hideForgotPassword.bind(this)} key="back">Back to login</a>
      );
    }

    return (
      <div style={{display: 'inline'}}>
        <Modal show={this.props.show} onHide={this.onHide.bind(this)}>
          <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <form onSubmit={!this.state.busy ? this.login.bind(this) : null}>
            <Modal.Body>
              {errorPrompt}
                <FormGroup id="email" key="email">
                  <ControlLabel>Email Address</ControlLabel>
                  <FormControl type="email"
                               placeholder="triton@ucsd.edu"
                               onChange={this.handleEmailChange.bind(this)}
                               required />
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