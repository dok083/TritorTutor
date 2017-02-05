var React = require("react");
var Modal = require("react-bootstrap/lib/Modal");
var Button = require('react-bootstrap/lib/Button');
var FormControl = require('react-bootstrap/lib/FormControl');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var ControlLabel = require('react-bootstrap/lib/ControlLabel');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var axios = require('axios');

var SignInModal = React.createClass( {
  displayName:'SignInModal',

  getInitialState: function(){
    return {showModal: false, username: '', password: ''};
  },
  
  close: function() {
    this.setState({showModal: false});
  },

  open: function() {
    this.setState({showModal: true});
  },

  login: function() {
    axios.post('/api/user/login', {
        email: this.state.email,
        password: this.state.password
    }).then(function (r) {
      alert(r.data.sessionID);
    }).catch(function (e) {
      if (e.response) {
        alert(e.response.status);
      } else {
        alert(e.message);
      }
    });
  },

  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },

  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },

  render: function() {
    /*
    const signIn = (
      <Signin id="sign in" title="sign in")
      */

    return (
      <div style={{display: 'inline'}}>

        <Button onClick={this.open}><Glyphicon glyph="user" /> Login </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
              <Modal.Title> Create an account! </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
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
            </form>
            <p>Are you a not member? Create an account!</p>
          </Modal.Body>
          
          <Modal.Footer>
            <Button onClick={this.login}>Login</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

module.exports = SignInModal;
