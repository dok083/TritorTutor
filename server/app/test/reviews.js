var Controller = require( "../controller/reviewController.js" );

var testID = 49
var testerID = 51
var ratings = 4

//console.log( testString.replace(/\ /g, "").toUpperCase().trim() );


Controller.add(testID, testerID, ratings, 'c' ).then( 
( result ) =>
{
	Controller.get(results).then(
	(reviews) =>
	{
     	  console.log( "\tID: " + reviews.userID );
       	  console.log( "\tRating: " + reviews.rating );
       	  console.log("\tComment: " + reviews.comment);
	});

} );



/*
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
*/