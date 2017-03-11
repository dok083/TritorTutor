var Controller = require( "../controller/courseController.js" );

var testString = "cse      100 "

console.log( testString.replace(/\ /g, "").toUpperCase().trim() );

Controller.getBySubstring( testString ).then(
( results ) =>
{
   console.log( "Number of matches: " + results.length );
   for ( var i = 0; i < results.length; i++ )
   {
       console.log( "Class " + i + ":" );
       console.log( "\tID: " + results[ i ].classID );
       console.log( "\tName: " + results[ i ].className );
   }
} );
