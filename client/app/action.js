"use strict"

/**
 * Constructor for the Action class.
 *
 * @param name the name of the action
 */
function Action(name) {
    this.name = name;
}

/**
 * Initialize this action.
 *
 * @param key the key to set
 * @param value the value to set the key to
 */
Action.prototype.set = function ( key, value )
{
    // initialize the data
    if ( !this.data )
    {
        this.data = {};
    }

    // set the value of the key
    this.data[ key ] = value;
}

Action.prototype.getData = function()
{
    return this.data || {};
}

Action.prototype.dispatch = function()
{
    require('./dispatch.js').onActionDispatched( this );
}

module.exports = Action;
