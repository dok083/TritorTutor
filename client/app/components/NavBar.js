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
var SignInModal = require("../components/SignInModal")


// for debugging lol
var Alert = require('react-bootstrap/lib/Alert') ;

var NavBar = React.createClass({
  render: function() {
    /* Maybe want to add Settings page... After logging in */

    /*
    TODO: fix buttons
    var navLinks = pages.map(function(page){ 
      var pages = ["Sign Up", "Log In"] ;
      return <Button onClick={this.handleClick}>{page}</Button>;
    }) ;
    */

    // TODO: figure out if we can put JSX in a var so only one return statement
    //       is needed at the end of the if statement
    // TODO: nest these inside Navs a react-bootstrap Navbar type

    // displays dropdown menu if logged in
    var userInfo;

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
          <ButtonToolbar>
            <SignInModal />
            <Button><Glyphicon glyph="globe" /> Sign Up</Button>
          </ButtonToolbar>
        </Nav>
      );
    }

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Tritor</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <FormGroup>
              <InputGroup>
                <FormControl type="text" placeholder="Looking for a..." />
                <InputGroup.Button>
                  <Button type="submit">Search</Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </Navbar.Form>
          <Navbar.Form>
            {userInfo}
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
});

module.exports = NavBar;
