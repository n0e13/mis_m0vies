/* const jwt = require('jsonwebtoken');

const jwt_secret = process.env.ULTRA_SECRET_KEY; */

const db = require('../models/userAPIModel');



// TODO: aquí la lógica de negocio

/* const loginUser = async (req, res) => {

} */

const signUpUser = async (req, res) => {
    try {

        const newUser = req.body; // {} nuevo user a guardar
        const response = await db.signUpUser(newUser);
        res.status(201).json({"user_created":response});
    } catch (error) {
        console.log('Error:', error);
    }  
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

