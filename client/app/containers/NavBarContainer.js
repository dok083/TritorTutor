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

  componentDidMount: function() {
    axios.get('/api/user')
      .then(function (res) {
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
        console.log(error);
        this.setState({loggedIn: false});
      }.bind(this))
  },

  // called whenever Log In or Sign Up (temporarily) is clicked
  changeLogIn: function(){
    // flips login status
    var newStatus = this.state.loggedIn ? false : true ;
    this.setState({loggedIn : newStatus}) ;
  },

  render: function(){
    return <NavBar loggedIn={this.state.loggedIn} user={this.state.user} onLog={this.changeLogIn} />
  }
});

module.exports = NavBarContainer ;
