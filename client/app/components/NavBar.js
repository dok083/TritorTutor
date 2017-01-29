var React = require("react");
var Button = require('react-bootstrap/lib/Button');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');

var NavBar = React.createClass({
  render: function() {
    var pages = ["Sign Up", "Log In"] ;
    var navLinks = pages.map(function(page){ 
    return <Button>{page}</Button>;
  }) ;

  return (
    <div>
      <DropdownButton title="Dropdown" id="bg-nested-dropdown">
        <MenuItem eventKey="1">Dropdown link</MenuItem>
        <MenuItem eventKey="2">Dropdown link</MenuItem>
      </DropdownButton>
      <ButtonToolbar className="pull-right">{navLinks}</ButtonToolbar>
    </div>
  )}
});

module.exports = NavBar;
