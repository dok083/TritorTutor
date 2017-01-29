var React = require("react");
var Button = require('react-bootstrap/lib/Button');

var NavBar = React.createClass({
  render: function () {
    var pages = ['Sign Up','Log In'];
    var navLinks = pages.map(function(page){
      return (
        <div class="container">
          <div class="row">
            <a href={'/' + page}>
              {page} <br />
            </a>
          </div>
        </div>
      );
    });

    return <nav>{navLinks}</nav>;
  }
});

module.exports = NavBar;