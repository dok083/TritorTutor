var Action = require( './action.js' );
var Dispatch = {};
// list of listeners for certain actions
Dispatch.listeners = {};

/**
 * Returns an action object for the desired type
 *
 * @param name type of the action
 * @returns an action object for the desired action.
 */
Dispatch.createAction = function ( name )
{
    return new Action( name );
}

/**
 * Runs all the callbacks associated with a particular action.
 *
 * @param action 
 */
Dispatch.onActionDispatched = function ( action )
{
    // go through all of the callbacks for a particular action 
    this.listeners[ action.name ].forEach( function( callback )
    {
        callback( action.getData() );
    } );
}

/**
 * Adds a listener for the desired action.
 *
 * @param name name of the action
 * @param callback a function to add to the list of functions that are called
 *          when this action is performed
 */
Dispatch.addListener = function ( name, callback )
{
    // prepare list for the callback
    if ( !this.listeners[ name ] )
    {
        this.listeners[ name ] = [];
    }

    // add callback to the listeners
    this.listeners[ name ].push( callback );
}

// export this object
module.exports = Dispatch;
