var React = require("react");
var NavBarContainer = require("../containers/NavBarContainer");

var App = React.createClass({
  render: function() {
    return (
      <div>
        <NavBarContainer />
        <h1>TritonTutor - Test 3</h1>
      </div>
    );
  }
});

module.exports = App;
