import React from 'react'
import { Alert, Button } from 'react-bootstrap'

class VerificationAlertComponent extends React.Component {
  render() {
    const style = {
      marginBottom: '-1px'
    };

    return (
      <Alert bsStyle='warning' style={style}>
        <h4>You are not a verified user!</h4>
        <p>Verifying your account will unlock features like requesting tutors or
        adding yourself as a tutor for a course. You need to be verified so we
        can make sure you are not a bot or something.</p>
        <p>If you did not receive an e-mail containing the verification code or
        need a new one, click the button below.</p>
        <br />
        <Button bsStyle='warning' onClick={this.props.onResend}>Resend
        Verification E-mail</Button>
      </Alert>
    );
  }
}

VerificationAlertComponent.displayName = 'VerificationAlertComponent';

export default VerificationAlertComponent;
