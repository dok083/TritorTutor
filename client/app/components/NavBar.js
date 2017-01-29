var React = require("react");
var Button = require('react-bootstrap/lib/Button');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar') ;

var NavBar = React.createClass({
/*
  render: function () {
    var pages = ['Sign Up','Log In'];
    var navLinks = pages.map(function(page){
      return (
        <div class="container">
          <div class="row">
            <a href={'/' + page}>
              {page} <br />
            </a>
          </div>
        </div>
      );
    });

    return <nav>{navLinks}</nav>;
  }
*/

   render: function(){
      var pages = ["Sign Up", "Log In"] ;
      var navLinks = pages.map(function(page){
         return <Button>{page}</Button>;
      }) ;

      return <ButtonToolbar className="pull-right">{navLinks}</ButtonToolbar> ;
   }
});

module.exports = NavBar;
