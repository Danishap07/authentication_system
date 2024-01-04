const mysql = require('mysql');


const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
    port: 3306
});



module.exports = connection;