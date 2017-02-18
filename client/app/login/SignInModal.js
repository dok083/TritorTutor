var React = require("react");
var Modal = require("react-bootstrap/lib/Modal");
var Button = require('react-bootstrap/lib/Button');
var FormControl = require('react-bootstrap/lib/FormControl');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var ControlLabel = require('react-bootstrap/lib/ControlLabel');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Alert = require('react-bootstrap/lib/Alert');
var axios = require('axios');

var SignInModal = React.createClass( {
  displayName:'SignInModal',

  getInitialState: function(){
    return {
      showModal: false,
      username: '',       // The current username.
      password: '',       // The current password.
      allowLogin: false,  // Whether or not the login button should be enabled.
      isLoggingIn: false, // Whether or not we are currently logged in.
      isLoggingIn: false, // Whether or not we are waiting for a login response.
      error: ''           // The error message that should be displayed, if any.
    };
  },
  
  close: function() {
    this.setState({showModal: false});
  },

  open: function() {
    this.setState({showModal: true});
  },

  // Called when the login button has been pressed.
  login: function(e) {
    e.preventDefault();
    this.setState({isLoggingIn: true, allowLogin: false});

    // Send login information to the server.
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
  },

  handleEmailChange: function(e) {
    var allowLogin = !this.state.isLoggingIn
                     && this.state.password.length > 0
                     && e.target.value.length > 0;

    this.setState({
      email: e.target.value,
      allowLogin: allowLogin
    });
  },

  handlePasswordChange: function(e) {
    var allowLogin = !this.state.isLoggingIn
                     && this.state.email.length > 0
                     && e.target.value.length > 0;

    this.setState({
      password: e.target.value,
      allowLogin: allowLogin
    });
  },

  showError: function(message) {
    this.setState({error: message});
  },

  render: function() {
    /*
    const signIn = (
      <Signin id="sign in" title="sign in")
      */

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

        <Button onClick={this.open}><Glyphicon glyph="user" /> Login </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {errorPrompt}
            <form onSubmit={this.state.allowLogin ? this.login : null}>
                <FormGroup id="email">
                  <ControlLabel>Email Address</ControlLabel>
                  <FormControl type="email" placeholder="triton@ucsd.edu"
                   onChange={this.handleEmailChange} />
                </FormGroup>
                <FormGroup id="password">
                  <ControlLabel>Password</ControlLabel>
                  <FormControl type="password" placeholder="Password"
                   onChange={this.handlePasswordChange} />
                </FormGroup>
                <Button bsStyle="primary" type="submit" disabled={!this.state.allowLogin}>Login</Button>
            </form>
          </Modal.Body>
            
          <Modal.Footer>
            Not a member? Create an account!
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

module.exports = SignInModal;
