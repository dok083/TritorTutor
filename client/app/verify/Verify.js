import React from 'react'
import { Grid, Col } from 'react-bootstrap'
import { IndexLink } from 'react-router'
import axios from 'axios'

class Verify extends React.Component {
  constructor(props) {
    super(props);

    this.state = {done: false};
  }

  componentWillMount() {
    axios.post('/api/verify/', {code: this.props.params.code})
      .then(() => {
        this.setState({done: true});
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(error.response.data.message);

          return;
        }

        alert('An error occured while verifying your account!\n' + error);
      });
  }

  render() {
    var message;

    if (this.state.done) {
      message = (
        <p>
          Your account has been verified! 
          <IndexLink to='/'>Click here to return to Tritor</IndexLink>.
        </p>
      );
    } else {
      message = <p>Please wait while Tritor verifies your account...</p>;
    }

    return (
      <div id='container'>
        <Grid>
          <Col xs={6} xsOffset={3}>
            <h1><br />Tritor Verification System</h1>
            {message}
          </Col>
        </Grid>
      </div>
    );
  }
}

Verify.displayName = 'Verify';

export default Verify
