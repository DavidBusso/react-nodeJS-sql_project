const mysql2 = require('mysql2/promise');

const pool = mysql2.createPool({
    host: "localhost",
    user: "root",
    database: "sqldata",
    password: "12345678",
});

module.exports = {
    pool
}