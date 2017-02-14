var React = require("react");
var img = {
  src: "../app/components/okaysoft.png"
};

const imgStyle = {
  width: "50px",
  height: "50px",
  opacity: "0.3",
  margin: "auto",
  display: "block"
};


var Footer = React.createClass({
  render: function () {
    return (
      <footer>
        <img 
          style = {imgStyle}
          src = {img.src}
        />
      </footer>
    )
  }

  });

module.exports = Footer;