const knex = require('knex');

const env = require('./env');

const connection = knex(env.databaseConfig);

connection.batchUpdate = (table, data) => {

    const { sql, bindings } = connection
    .insert(data)
    .into(table)
    .toSQL();

    return connection.raw(sql.replace('insert', 'replace'), bindings);
}

module.exports = connection;