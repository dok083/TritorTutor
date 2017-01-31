var React = require("react");
var Button = require('react-bootstrap/lib/Button');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');
// for debugging lol
var Alert = require('react-bootstrap/lib/Alert') ;

var NavBar = React.createClass({
  handleClick: function(){
    // calls NavBarContainer's login flip function
    this.props.onLog() ;
  },

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
    if(this.props.loggedIn){
      return (
        <DropdownButton title="Dropdown" id="bg-nested-dropdown">
          <MenuItem eventKey="1">Settings</MenuItem>
          <MenuItem eventKey="2">Log Out</MenuItem>
        </DropdownButton>
      ) ;
    }
    // displays Log In and Sign Up buttons if logged out
    else {
      return (
        <ButtonToolbar className="pull-right">
          <Button onClick={this.handleClick}>Log In</Button>
        </ButtonToolbar>
      ) ;
    }
  }
});

module.exports = NavBar ;
