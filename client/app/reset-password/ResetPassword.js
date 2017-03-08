import React from 'react'
import { Grid, Col, Alert } from 'react-bootstrap'
import axios from 'axios'

import ResetPasswordForm from './ResetPasswordComponent'

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      done: false,
      busy: false,
      message: '',
      messageType: 'danger'
    }
  }

  changePassword(newPassword) {
    this.setState({busy: true});

    axios.post('/api/reset-password', {password: newPassword})
      .then(() => {
        this.setState({done: true});
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

  showError(message) {
    this.setState({
      message: message,
      messageType: 'danger'
    });
  }

  render() {
    // A message that is displayed above the form.
    var message;

    if (this.state.message.length > 0) {
      message = <Alert bsStyle={this.state.messageType}>{this.state.message}</Alert>;
    }

    // The content for the form.
    var content;

    if (this.state.done) {
      content = <p>Your password has been successfully changed!</p>;
    } else {
      content = (
        <ResetPasswordForm onSubmit={this.changePassword.bind(this)}
                           onError={this.showError.bind(this)}
                           disabled={this.state.busy} />
      );
    }

    return (
      <div id='container'>
        <Grid>
          <Col xs={8} xsOffset={2}>
            <h2><br /><br />Tritor Password Reset</h2>
            {message}
            <p>Please enter your new desired password:</p>
            {content}
          </Col>
        </Grid>
        <br />
      </div>
    );
  }
}

ResetPassword.displayName = 'ResetPassword'

export default ResetPassword
