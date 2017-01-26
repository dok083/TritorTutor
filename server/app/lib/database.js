// Get configuration for database connection.
var config = require('../../config/database.json');
var mysql = require('mysql');

// Create a query pool for our queries.
var pool = mysql.createPool(config);

module.exports = {
    /**
     * Queries the database using an SQL query. Once the query has results, the
     * callback is called with those results. 
     *
     * @param query The SQL query that will be run.
     * @param values A list of values to substitute '?' in queries. This may
     *        also be the callback as the value list is optional.
     * @param callback A function that runs once the query has results.
     */
    query: function(query, values, callback) {
        pool.query(query, values, callback);
    },

    // Alias to mysql.escape
    escape: mysql.escape,

    /**
     * Inserts values using an object where the keys are the column names and
     * the corresponding values are the values that will be inserted. If there
     * are no columns specified, then nothing happens.
     *
     * @param table The table to insert the data into.
     * @param data The data that should be inserted.
     * @param callback A function that runs once the query has results.
     */
    insert: function(table, data, callback) {
        // Split the data into keys and values.
        var index = 0;
        var columns = [];
        var values = [];
        var tempValues = [];

        Object.keys(data).forEach(function(column) {
            columns[index] = '`' + column + '`';
            values[index] = data[column];
            tempValues[index] = '?';

            index++;
        });

        // Make sure there is data being inserted.
        if (index == 0) {
            return;
        }

        // Run the insertion query.
        var query = 'INSERT INTO ' + table + '(' + columns.join() + ') VALUES ('
                    + tempValues.join() + ')';

        pool.query(query, values, callback);
    },

    /**
     * Selects desired values from a given table. Note if there are no columns
     * to select, then nothing is done.
     *
     * @param table The table to select values from.
     * @param columns A list of keys to select. If this is not an list,
     *        then all keys are selected (SELECT *).
     * @param condition A condition for when certain values should be selected.
     * @param callback A function that runs once the query has results.
     * @param limit The maximum number of rows to select data from.
     * @param order How to order the selected data.
     */
    select: function(table, columns, condition, callback, limit, order) {
        // Convert keys in to a string list of keys.
        if (columns instanceof Array) {
            if (columns.length == 0) {
                return;
            }

            columns = columns.map(function(column) {
                return '`' + column + '`';
            }).join();
        } else {
            table = '*';
        }

        // Start the select query.
        var query = 'SELECT ' + columns + ' FROM ' + table;

        // Add the desired condition.
        if (condition) {
            query += ' WHERE ' + condition;
        }

        // Add the desired order.
        if (order) {
            query += ' ORDER BY' + order;
        }

        // Add the desired limit.
        if (limit) {
            query += ' LIMIT ' + limit;
        }

        pool.query(query, callback);
    },

    /**
     * Updates desired values in the database for rows matching a
     * given condition. Note if the data is empty, then nothing happens.
     *
     * @param table The table to update values in.
     * @param data The data to update. This is an object where the keys
     *        correspond to the columns and the corresponding values
     *        are what the new value is.
     * @param condition A string specifies the condition for which rows should
     *        be updated.
     * @param callback A function that is called after the update query
     *        has results.
     * @param limit The maximum number of rows that can be affected.
     */
    update: function(table, data, condition, callback, limit) {
        // Set up the assignments for the update query.
        var updates = [];
        var values = [];

        Object.keys(data).forEach(function(key) {
            values[updates.length] = data[key];
            updates[updates.length] = '`' + key + '`=?';
        });

        // Check if there were actual updates.
        if (updates.length == 0) {
            return;
        }

        // Start generating the query.
        var query = 'UPDATE ' + table + ' SET ' + updates.join();

        // Add the desired condition.
        if (condition) {
            query += ' WHERE ' + condition;
        }

        // Add the desired limit.
        if (limit) {
            query += ' LIMIT ' + limit;
        }

        pool.query(query, values, callback);
    }
};