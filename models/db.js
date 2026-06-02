"use strict";

// Databasanslutning med MySQL och dotenv
const mysql = require("mysql2");
require("dotenv").config();

// Skapande av anslutning till databasen
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Hantering av anslutning och eventuella fel
connection.connect((err) => {
    if (err) {
        console.error("Fel vid anslutning till databas" + err);
        return;
    }

    console.log("Ansluten till databas");
});

module.exports = connection;