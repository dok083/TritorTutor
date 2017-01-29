var React = require("react");
var NavBar = require("./NavBar");

var App = React.createClass({
	render: function() {
		return (
			<div>
				<NavBar />
				<h1>TritonTutor - Test 3</h1>
			</div>
		);
	}
});

module.exports = App;
