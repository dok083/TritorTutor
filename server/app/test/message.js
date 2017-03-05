var Controller = require( "../controller/messageController.js" );

var sender = 36;
var receiver = 36;

Controller.send( sender, receiver, "Test", "test test test" ).then( ( MID ) =>
{
    Controller.getByMID( MID ).then( ( message ) =>
    {
        console.log( "Testing: messageController.getByMID()..." );
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
        return Controller.deleteByMID( MID );
    } ).then( 
    () => {
        Controller.getByMID( MID ).then( ( message ) =>
        {
            console.assert( message == null );
        });
    }) 
});
