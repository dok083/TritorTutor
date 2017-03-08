import React from 'react'
import VerificationAlertComponent from './VerificationAlertComponent'
import axios from 'axios'

class VerificationAlertCountainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    }
  }

  resend() {
    axios.post('/api/verify/resend')
      .then(() => {
        alert('A verification email is on the way. Please check your e-mail.');
      });
  }

  render() {
    if (!this.props.user || this.props.user.verified !== false) {
      return null;
    }

    return <VerificationAlertComponent onResend={this.resend.bind(this)} />
  }
}

VerificationAlertCountainer.displayName = 'VerificationAlertCountainer';

export default VerificationAlertCountainer
