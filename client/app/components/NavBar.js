var React = require("react");
var Button = require('react-bootstrap/lib/Button');


var NavBar = React.createClass({
  render: function () {
    var pages = ['Sign Up','Log In'];
    var navLinks = pages.map(function(page){
      return (
        <a href={'/' + page}>
          {page}
        </a>

      );
    });

    return (
      <div class="container">
        <div class="row">
          <nav class="col-6 col-md-4">{navLinks}</nav>
        </div>
      </div>
      )
  }
});

module.exports = NavBar;