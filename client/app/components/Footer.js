var React = require("react");
var img = {
  src: "../app/components/okaysoft.png",
  width: "50px",
  height: "50px",
  opacity: "0.5"
};

var Footer = React.createClass({
  render: function () {
    return (
      <footer>
        <img
          src = {img.src}
          width = {img.width}
          height = {img.height}
        />
      </footer>
    )
  }

  });

module.exports = Footer;