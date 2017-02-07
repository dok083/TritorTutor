var React = require("react") ;
var NavBar = require("../components/NavBar") ;
// debugging
var Alert = require("react-bootstrap/lib/Alert") ;
var axios = require('axios');

var NavBarContainer = React.createClass({
  // we start logged out
  getInitialState: function(){
    return {loggedIn: false, user: {userID: 0, email: '', username: ''}};
  },

  checkLoggedIn: function() {
    // Try to get user information from our current session.
    axios.get('/api/user')
      .then(function (res) {
        // If there is a user, then display the user's information.
        this.setState({
          loggedIn: true,
          user: {
            userID: res.data.userID,
            email: res.data.email,
            username: res.data.username
          }
        });
      }.bind(this))
      .catch(function (error) {
        // Otherwise, set that we are not logged in yet.
        console.log(error);
        this.setState({loggedIn: false});
      }.bind(this))
  },

  componentDidMount: function() {
    // When the page loads, set the top right to show the user.
    this.checkLoggedIn();
  },

  // called whenever Log In or Sign Up (temporarily) is clicked
  onLogin: function(results) {
    // After logging in, set the top right to show the user.
    this.checkLoggedIn();
  },

  render: function(){
    return <NavBar loggedIn={this.state.loggedIn} user={this.state.user} onLogin={this.onLogin} />
  }
});

module.exports = NavBarContainer ;
