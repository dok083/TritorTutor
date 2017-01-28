var React = require("react");

var NavBar = React.createClass({
  render: function () {
    var pages = ['Sign Up','Log In'];
    var navLinks = pages.map(function(page){
      return (
        <a href={'/' + page}>
          {page} <br />
        </a>

      );
    });

    return <nav>{navLinks}</nav>;
  }
});

module.exports = NavBar;