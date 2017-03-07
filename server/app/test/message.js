var Controller = require( "../controller/messageController.js" );

var sender = 36;
var receiver = 36;

Controller.send( sender, receiver, "Test", "test test test" ).then( 
( MID ) =>
{
    Controller.getByMID( MID ).then( 
    ( message ) =>
    {
        console.log( "\nTesting: messageController.getByMID()...\n" );
        console.assert( message.sender == sender, 
            "Test failed: sender does not match" );
        console.assert( message.recipient == receiver, 
            "Test failed: receiver does not match" );
        console.assert( message.title == "Test", 
            "Test failed: title does not match" );
        console.assert( message.content == "test test test", 
            "Test failed: content does not match" );
    } ).then( 
    () =>
    {
        console.log( "\nTesting: messageController.deleteByMID()...\n" );
        return Controller.deleteByMID( MID );
    } ).then( 
    () => {
        Controller.getByMID( MID ).then( ( message ) =>
        {
            console.assert( message == null,
            "Test failed: deleted message not null" );
        });
    }).catch(
    () =>
    {
        console.log( "A test failed..." );
    } );
} ).then(
() => 
{
    //console.log( "Tests complete..." );

    Controller.send( sender, receiver, "Test1", "test1" ).then( 
    ( MID1 ) =>
    {
    Controller.send( sender, receiver, "Test2", "test2" ).then( 
        ( MID2 ) =>
        {
        Controller.send( sender, receiver, "Test3", "test3" ).then( 
            ( MID3 ) =>
            {
                console.log( "\nTesting: messageController.getByUID()...\n" );
                Controller.getByUID( receiver ).then(
                ( messages ) =>
                {
                    for ( var i = 2; i <= 0; i-- )
                    {
                    console.assert( messages[ i ].sender == sender, 
                        "Test failed: sender does not match" );
                    console.assert( messages[ i ].recipient == receiver, 
                        "Test failed: receiver does not match" );
                    console.assert( messages[ i ].title
                        == ( "Test" + ( 3 - i ) ), 
                        "Test failed: title does not match" );
                    console.assert( messages[ i ].content
                        == ( "Test" + ( 3 - i ) ), 
                        "Test failed: content does not match" );
                    }
                } );
            } );
        } );
    } );

} );
//console.log( "Tests complete..." );

Controller.deleteByUID( receiver ).then( 
() =>
{
    console.log( "\nTesting: messageController.deleteByUID()...\n" );
    Controller.getByUID( receiver ).then(
    ( messages ) =>
    {
        console.assert( messages == null, 
            "Test failed: more than 0 messages" );
    } );
} );
