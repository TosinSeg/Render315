//const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
// Create express app
//const app = express();
const port = 3000;

console.log(process.env.PSQL_USER);
// Create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

let data = []
pool
    .connect()
    .then(client => {
        return client
            .query('SELECT * FROM inventory')
            .then(res => {
                client.release()
                console.log(res.rows[0])
            })
            .catch(err => {
                client.release()
                console.log(err.stack)
            })
    })

process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});

