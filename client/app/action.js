var Action = {};

/**
 * Initialize this action.
 *
 * @param key the key to set
 * @param value the value to set the key to
 */
Action.set = function ( key, value )
{
    // initialize the data
    if ( !this.data )
    {
        this.data = {};
    }

    // set the value of the key
    this.data[ key ] = value;
}

Action.getData = function()
{
    return this.data || {};
}

Action.dispatch = function()
{
    Dispatch.onActionCreated( this );
}

module.exports = function ( name )
{
    var action = new Action();
    action.name = name;

    return action;
}
