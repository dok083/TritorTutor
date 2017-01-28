var React = require("react");
var ReactDOM = require("react-dom");

var App = require("./components/App");
var NavBar = require("./components/NavBar");

ReactDOM.render(<App />, document.getElementById("app"));
ReactDOM.render(<NavBar />, document.getElementById("navbar"));
