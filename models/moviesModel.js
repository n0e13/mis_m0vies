require('dotenv').config();

const { Pool } = require('pg');
const client = require('pg/lib/native/client');

const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER_DB,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
});