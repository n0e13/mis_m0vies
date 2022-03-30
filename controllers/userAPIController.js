const db = require('../models/userAPIModel');

const { Pool } = require('pg')
const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER_DB,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
})


// TODO: aquí la lógica de negocio

/* const loginUser = async (req, res) => {

} */

const signUpUser = async (req, res) => {

    console.log(req.body); // Objeto recibido de user nuevo
    const newUser = req.body; // {} nuevo user a guardar

    const response = await db.signUpUser(newUser);
    res.status(201).json({"user_created":response});

}

/* const recoverPassword = async (req, res) => {

}

const resetPassword = async (req, res) => {

}

const logoutUser = async (req, res) => {

} */


const user = {
  /*   loginUser, */
    signUpUser,
/*     recoverPassword,
    resetPassword,
    logoutUser */
}

module.exports = user;

