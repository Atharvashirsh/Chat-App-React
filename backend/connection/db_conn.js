const mysql2 = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const sqlConnection = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});

sqlConnection.connect((err) => {
    if (err) throw err;
    console.log("DB Connection established");
});

const DB_NAME = process.env.DB_NAME || "chatapp";

sqlConnection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`, (err, result) => {
    if (err) throw err;
    console.log(`Database ${DB_NAME} created`);
});

const dbConnection = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: DB_NAME,
});

dbConnection.connect((err) => {
    if (err) throw err;
    console.log("Database connected succesfully");
});

module.exports = dbConnection;
