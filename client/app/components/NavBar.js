var React = require("react");
var Button = require('react-bootstrap/lib/Button');
<<<<<<< HEAD
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar') ;
=======
>>>>>>> 10194f5090c5e7d2252d5901b63dab2ec0121334


var NavBar = React.createClass({
/*
  render: function () {
    var pages = ['Sign Up','Log In'];
    var navLinks = pages.map(function(page){
      return (
        <a href={'/' + page}>
          {page}
        </a>

      );
    });

    return (
      <div class="container">
        <div class="row">
          <nav class="col-6 col-md-4">{navLinks}</nav>
        </div>
      </div>
      )
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
