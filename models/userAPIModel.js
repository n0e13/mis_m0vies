require('dotenv').config();
const queries = require('../utils/queries.js');

const { Pool } = require('pg')
const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER_DB,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
})

/* const loginUser = async (email) => {
    // TODO: login
} */

const signUpUser = async (user) => {

    // TODO: registro

    const {name,surname,email} = user; // entry = req.body
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query((queries.signUpUserInsert),[name,surname,email])
        result = data.rowCount
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();
    } 
    return result

}
/* 
const recoverPassword = async (email) => {
    // TODO: recoverpass
}

const resetPassword = async (email) => {
    // TODO: resetpass
}

const logoutUser = async (email) => {
    // TODO: logout
} */


const userAPI = {
    /* loginUser, */
    signUpUser,
/*     recoverPassword,
    resetPassword,
    logoutUser */
}

module.exports = userAPI;