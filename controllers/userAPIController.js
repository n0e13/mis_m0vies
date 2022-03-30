const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const regex = require('../utils/regex');
const jwt_secret = process.env.ULTRA_SECRET_KEY;

const db = require('../models/userAPIModel');


// TODO: aquí la lógica de negocio

/* const loginUser = async (req, res) => {

} */

const signUpUser = async (req, res) => {

    /*     console.log(req.body); // Objeto recibido de user nuevo
        const newUser = req.body; // {} nuevo user a guardar
    
        const response = await db.signUpUser(newUser);
        res.status(201).json({"user_created":response});
     */

    let data;
    try {
        const { email, password, username } = req.body;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        if (regex.validateEmail(email) && regex.validatePassword(password)) {
            data = await User.create({ 'email': email, 'password': hashPassword, 'username': username, 'logged': false });
            res.status(201).json(data);
        } else {
            res.status(400).json({ msg: 'Invalid email or password' });
        }
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

