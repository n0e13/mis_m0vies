const db = require('../models/userAPIModel');
const sqldb = require('../utils/dbconfig-pg.js')


// TODO: aquí la lógica de negocio

/* const loginUser = async (req, res) => {

} */

const signUpUser = async (req, res) => {
    try {

        const newUser = req.body; // {} nuevo user a guardar
        const hashPassword = await bcrypt.hash(password, 10);
        if(regex.validateEmail(email) && regex.validatePassword(password)){
            const response = await db.signUpUser(newUser);
            res.status(201).json({"user_created":response});
        }else{
            res.status(400).json({msg: 'Invalid email or password'});
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

