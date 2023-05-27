const mysql = require('mysql');
const {promisify} = require('util');
require('dotenv').config();

const pool = mysql.createPool(JSON.parse(process.env.DATABASE_CONF));

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_ERROR') {
            console.error('DATABASE CONNECTION WAS CLOSED', err);
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTIONS', err);
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED', err);
        }
    }
    if (connection) {
        connection.release();
        console.log('DB is connected');
    }
});

pool.query =  promisify(pool.query);

module.exports = pool;