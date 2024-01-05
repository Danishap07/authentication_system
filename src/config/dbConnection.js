const mysql = require('mysql');


const connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
    port: process.env.DBPORT
});



module.exports = connection;