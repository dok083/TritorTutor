import React from 'react'
import { Alert, Grid, Col, Image, Well, Button, PanelGroup, Panel, ListGroup, ListGroupItem, Label, Glyphicon, FormControl } from 'react-bootstrap'
import { Link, browserHistory } from 'react-router'
import axios from 'axios'

class AccountSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      passwordConfirm: '',
      message: '',
      messageStyle: 'danger'
    }
  }

  onPasswordChange(e) {
    this.setState({password: e.target.value});
  }

  onPasswordConfirmChange(e) {
    this.setState({passwordConfirm: e.target.value});
  }

  changePassword() {
    if (this.state.password.length < 4) {
      this.setState({
        message: 'Your password must be at least four characters long.',
        messageStyle: 'danger'
      });

      return;      
    }

    if (this.state.password != this.state.passwordConfirm) {
      this.setState({
        message: 'Your password confirmation did not match your new password.',
        messageStyle: 'danger'
      });

      return;
    }

    axios.post('/api/settings', {password: this.state.password})
      .then(() => {
        this.setState({
          message: 'Your password has been updated.',
          messageStyle: 'success'
        });
      })
      .catch((error) => {
        var message = error.response && error.response.data;

        if (message.message) {
          message = message.message;
        } else {
          message = error.toString();
        }

        this.setState({
          message: message,
          messageStyle: 'danger'
        });
      });
  }

  eventHandle() {
    confirm('Are you sure you want to deactivate your account?');
    browserHistory.push('/');
  }

  render() {
    var alert;

    if (this.state.message.length > 0) {
      alert = <Alert bsStyle={this.state.messageStyle}>{this.state.message}</Alert>;
    }

    return (
      <div>
        {alert}
        <Panel header="Password">
          <FormControl
            type="password"
            placeholder="New Password"
            onChange={this.onPasswordChange.bind(this)} />
          <br />
          <FormControl
            type="password"
            placeholder="Confirm Password"
            onChange={this.onPasswordConfirmChange.bind(this)} />
          <br />
          <Button type="submit"
                  className='pull-right'
                  onClick={this.changePassword.bind(this)}>
            Update
          </Button>
        </Panel>


        <Panel header="Deactivate Account">
          <Button vertical block bsStyle ="danger" onClick={this.eventHandle}> DEACTIVATE ACCOUNT</Button>
        </Panel>
      </div>
    )
  }
}

AccountSettings.displayName = 'AccountSettings'

export default AccountSettings
