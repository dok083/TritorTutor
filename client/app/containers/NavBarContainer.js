var React = require("react") ;
var NavBar = require("../components/NavBar") ;
// debugging
var Alert = require("react-bootstrap/lib/Alert") ;

var NavBarContainer = React.createClass({
  // we start logged out
  getInitialState: function(){
    return {loggedIn: false} ;
  },

  // called whenever Log In or Sign Up (temporarily) is clicked
  changeLogIn: function(){
    // flips login status
    var newStatus = this.state.loggedIn ? false : true ;
    this.setState({loggedIn : newStatus}) ;
  },

  render: function(){
    return (
      <NavBar loggedIn={this.state.loggedIn} onLog={this.changeLogIn} />
      
    ) ;
  }
}) ;

module.exports = NavBarContainer ;
