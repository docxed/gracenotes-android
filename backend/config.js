const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'gracenote',
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

module.exports = pool;