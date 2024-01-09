const mysql = require('mysql');
require('dotenv').config({ path: './.env' });

const connection_db_mysql = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection_db_mysql.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    } else {
        console.log('Ok.! ....Connected to Mysql ');
    }
});

module.exports = connection_db_mysql;