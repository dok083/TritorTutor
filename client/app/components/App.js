var React = require("react");
var NavBarContainer = require("../containers/NavBarContainer");
var SignInModal = require("../components/SignInModal");
var Footer = require("../components/Footer.js")

var App = React.createClass({
  render: function() {
    return (
      <div>

      /* HEAD */
      <NavBarContainer />
        
      /*BODY*/
      /*GIANTIC SEARCH BAR - auto complete from */
      <h1>TritonTutor - Test 3</h1>

      /*LOGO*/
      </div>
      <Footer />
    );
  }
});

module.exports = App;
