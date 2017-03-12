"use strict"

/**
 * This file provides a wrapper for node-mysql and allows for common queries
 * to be made with shorter code.
 */

// Get configuration for database connection.
var config = require('../../config/database.json');

// Create a query pool for our queries.
var mysql = require('mysql');
var pool = mysql.createPool(config);

/**
 * Queries the database using an SQL query. Once the query has results, the
 * callback is called with those results. 
 *
 * @param query The SQL query that will be run.
 * @param values A list of values to substitute '?' in queries. This may
 *        also be the callback as the value list is optional.
 * @return A promise which contains results from the database. If the query was
 *         successful, then the promise is fulfilled with results from the
 *         database as an array and the associated fields. Otherwise, the
 *         promise is rejected with the associated error.
 */
function query(query, values) {
    return new Promise(function(resolve, reject) {
        pool.query(query, values, function(error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    }).catch((error) => {
        console.log('Query Errored!');
        console.log('Query: ' + query);
        console.log('Error: ' + error);
    });
}

/**
 * Inserts values using an object where the keys are the column names and
 * the corresponding values are the values that will be inserted. If there
 * are no columns specified, then nothing happens.
 *
 * @param table The table to insert the data into.
 * @param data The data that should be inserted.
 * @return A promise which contains results from the database. If the query was
 *         successful, then the promise is fulfilled with results from the
 *         database as an array and the associated fields. Otherwise, the
 *         promise is rejected with the associated error.
 */
function insert(table, data) {
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
    var queryStr = 'INSERT INTO ' + table + '(' + columns.join()
                   + ') VALUES ('
                   + tempValues.join() + ')';

    return query(queryStr, values);
}

/**
 * Selects desired values from a given table. Note if there are no columns
 * to select, then nothing is done.
 *
 * @param table The table to select values from.
 * @param columns A list of keys to select. If this is not an list,
 *        then all keys are selected (SELECT *).
 * @param condition A condition for when certain values should be selected.
 * @param limit The maximum number of rows to select data from.
 * @param order How to order the selected data.
 * @return A promise which contains results from the database. If the query was
 *         successful, then the promise is fulfilled with results from the
 *         database as an array and the associated fields. Otherwise, the
 *         promise is rejected with the associated error.
 */
function select(table, columns, condition, limit, order) {
    // Convert keys in to a string list of keys.
    if (columns instanceof Array) {
        if (columns.length == 0) {
            return;
        }

        columns = columns.map(function(column) {
            return '`' + column + '`';
        }).join();
    } else {
        columns = '*';
    }

    // Start the select query.
    var queryStr = 'SELECT ' + columns + ' FROM ' + table;

    // Add the desired condition.
    if (condition) {
        queryStr += ' WHERE ' + condition;
    }

    // Add the desired order.
    if (order) {
        queryStr += ' ORDER BY ' + order;
    }

    // Add the desired limit.
    if (limit) {
        queryStr += ' LIMIT ' + limit;
    }

    return query(queryStr);
}

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
 * @param limit The maximum number of rows that can be affected.
 * @return A promise which contains results from the database. If the query was
 *         successful, then the promise is fulfilled with results from the
 *         database as an array and the associated fields. Otherwise, the
 *         promise is rejected with the associated error.
 */
function update(table, data, condition, limit) {
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
    var queryStr = 'UPDATE ' + table + ' SET ' + updates.join();

    // Add the desired condition.
    if (condition) {
        queryStr += ' WHERE ' + condition;
    }

    // Add the desired limit.
    if (limit) {
        queryStr += ' LIMIT ' + limit;
    }

    return query(queryStr, values);
}

// Expose the database library to the public.
module.exports = {
    query: query,
    escape: mysql.escape,
    insert: insert,
    select: select,
    update: update
};
