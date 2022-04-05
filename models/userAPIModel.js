require('dotenv').config(); //dotenv
const express = require('express'); 
const queries = require('../utils/queries.js'); 
const pool = require('../utils/dbconfig-pg.js');
const regex = require('../utils/regex');
const bcrypt = require('bcrypt'); //bcrypt --> encript password
const config = require('../configs/config');
const app = express();
app.set('llave', config.llave);



//-------------------------Esta función trae todos los usuarios de la bbdd---------------------//
const getUsers = async ()=>{
    let client,result;
    try{
        client = await pool.connect();
        const data = await client.query((queries.getUsersQuery));
        result = data.rows;
    }
    catch{
        console.log(err);
        throw err;
    }
    finally{
        client.release();
    }
    return result
}

const signUpUser = async (user, res) => {
    // TODO: registro
    const {name,surname,email,pass,pass2} = user; 
    console.log(user);
    const hashPassword = await bcrypt.hash(pass, 10);
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        if(regex.validateEmail(email) && regex.validatePassword(pass) && pass==pass2){
            const data = await client.query((queries.signUpUserQuery),[name,surname,email,hashPassword])
            result = data.rowCount;
        }else{
            res.status(400).json({msg: 'Invalid email or password'}); 
        }
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();
    } 
    return result;
}


/* 
const recoverPassword = async (email) => {
    // TODO: recoverpass
}

// const recoverPassword = async (email) => {
//     // TODO: recoverpass
// }

// const resetPassword = async (email) => {
//     // TODO: resetpass
// }

// const logoutUser = async (email) => {
//     // TODO: logout

// } 
*/



const userAPI = {
    signUpUser,
    getUsers,
/*     recoverPassword,
    resetPassword,
    logoutUser */
}

module.exports = userAPI;