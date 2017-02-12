var React = require("react");
var Button = require('react-bootstrap/lib/Button');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');
var Navbar = require('react-bootstrap/lib/Navbar');
var Nav = require('react-bootstrap/lib/Nav');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var InputGroup = require('react-bootstrap/lib/InputGroup');
var FormControl = require('react-bootstrap/lib/FormControl');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var NavItem = require("react-bootstrap/lib/NavItem");
var Modal = require("react-bootstrap/lib/Modal");
var ControlLabel = require("react-bootstrap/lib/ControlLabel");
var axios = require('axios');

// For debugging lol
var Alert = require('react-bootstrap/lib/Alert') ;

var NavBar = React.createClass({
  getInitialState: function(){
    return {
      showLogInModal: false,
      showSignUpModal: false,
      username: '',       // The current username.
      password: '',       // The current password.
      allowLogin: false,  // Whether or not the login button should be enabled.
      isLoggingIn: false, // Whether or not we are currently logged in.
      isLoggingIn: false, // Whether or not we are waiting for a login response.
      error: ''           // The error message that should be displayed, if any.
    };
  },
  
  closeLogInModal: function() {
    this.setState({showLogInModal: false});
  },

  closeSignUpModal: function() {
    this.setState({showSignUpModal: false});
  },
  
  openLogInModal: function() {
    this.setState({showLogInModal: true});
  },

  openSignUpModal: function() {
    this.setState({showSignUpModal: true});
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
      
      this.closeLogInModal();
    }.bind(this)).catch(function (e) {
      // Otherwise, keep this window open and show the login error.
      this.openLogInModal();
      
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
    var userInfo; // Displays dropdown menu if logged in
    var errorPrompt;

    if (this.state.error.length > 0) {
      errorPrompt = (
        <Alert bsStyle="danger">
          <h4>Oh no!</h4>
          <p>{this.state.error}</p>
        </Alert>
      );
    }
    
    // Determine what to display in the top right "user" area.
    if (this.props.loggedIn) {
      userInfo = (
        <Nav pullRight>
          <DropdownButton title={'Welcome back, ' + this.props.user.username + '!'} id="bg-nested-dropdown">
            <MenuItem eventKey="1">Settings</MenuItem>
            <MenuItem eventKey="2">Log Out</MenuItem>
          </DropdownButton>
        </Nav>
      );
    } else {
      userInfo = (
        <Nav pullRight>
          <NavItem onClick={this.openLogInModal} href="#">Log In</NavItem>
          <NavItem onClick={this.openSignUpModal} href="#">Sign up</NavItem>
          
          {/* Log in modal */}
          <Modal show={this.state.showLogInModal} onHide={this.closeLogInModal}>
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
        
          {/* Sign up modal */}
          <Modal show={this.state.showSignUpModal} onHide={this.closeSignUpModal}>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <form>
                  <FormGroup id="email">
                    <ControlLabel>Email Address</ControlLabel>
                    <FormControl type="email" placeholder="triton@ucsd.edu" />
                  </FormGroup>
                  <FormGroup id="password">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl type="password" placeholder="Password" />
                  </FormGroup>
                  <Button bsStyle="primary" type="submit">Login</Button>
              </form>
            </Modal.Body>

            <Modal.Footer>
              Not a member? Create an account!
            </Modal.Footer>
          </Modal>
        </Nav>
      );
    }

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Tritor</a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
            {userInfo}
        </Navbar.Collapse>
      </Navbar>
    );
  }
});

module.exports = NavBar;
