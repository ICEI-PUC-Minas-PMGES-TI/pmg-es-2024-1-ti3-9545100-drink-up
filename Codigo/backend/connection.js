const mysql = require("mysql");

const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'drink_up'
})

exports.database = database