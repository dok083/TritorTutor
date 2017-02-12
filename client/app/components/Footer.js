var React = require("react");
var img = {
  src: "../components/okaysoft.png"
};

var Footer = React.createClass({
  render: function () {
    return (
      <footer>
        <img
          src = {img.src}
        />
      </footer>
    )
  }

  });

module.exports = Footer;