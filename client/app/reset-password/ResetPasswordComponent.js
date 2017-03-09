import React from 'react'
import { FormControl, Button } from 'react-bootstrap'

class ResetPasswordComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      passwordConfirm: ''
    };
  }

  onPasswordChange(e) {
    this.setState({password: e.target.value});
  }

  onPasswordConfirmChange(e) {
    this.setState({passwordConfirm: e.target.value});
  }

  changePassword() {
    // Make sure the confirmation is correct.
    if (this.state.password != this.state.passwordConfirm) {
      this.props.onError('Your passwords do not match.');

      return;
    }

    // Make sure the length is good.
    if (this.state.password.length < 4) {
      this.props.onError('Your password must be at least four characters long.');

      return;
    }

    this.props.onSubmit(this.state.password);
  }

  render() {
    return (
      <div>
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
              bsStyle="primary"
              className='pull-right'
              disabled={this.props.disabled}
              onClick={this.changePassword.bind(this)}>
        Change Password
      </Button>
      </div>
    );
  }
}

ResetPasswordComponent.displayName = 'ResetPasswordComponent'

export default ResetPasswordComponent
