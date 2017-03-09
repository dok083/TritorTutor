var Controller = require( "../controller/tutorController.js" );

var test_CID = "WCWP10B"; 
var test_UID = 50;

// add test tutor
//Controller.add( test_CID, test_UID, "test4", 10.00, 3 );
// remove test tutor
//Controller.remove( test_CID, test_UID );

//var testUpdateObj = 
//{
//    avgRating: 4, 
//    description: "updated", 
//    price: 10, 
//    negotiable: 0
//}

// update test tutor
//Controller.update( test_CID, test_UID, testUpdateObj );

// get test class
Controller.get( test_CID ).then( 
( result ) =>
{
   console.log( "Number of tutors: " + result.length );
   for ( var i = 0; i < result.length; i++ )
   {
       console.log( "Tutor " + i + ":" );
       console.log( "\tID: " + result[ i ].tutorID );
       console.log( "\tClass ID: " + result[ i ].classID );
       console.log( "\tDescription: " + result[ i ].description );
       console.log( "\tRating: " + result[ i ].avgRating );
       console.log( "\tPrice: " + result[ i ].price );
       console.log( "\tNegotiable: " + result[ i ].negotiable );
   }
} );
