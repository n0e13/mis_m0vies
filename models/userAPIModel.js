require('dotenv').config(); //dotenv
const queries = require('../utils/queries.js'); 
const pool = require('../utils/dbconfig-pg.js')
const regex = require('../utils/regex');

const bcrypt = require('bcrypt'); //bcrypt --> encript password



/* const loginUser = async (email) => {
    // TODO: login

    const {email, password} = user; // entry = req.body
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query((queries.loginUser),[email, password])
        result = data.rowCount
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();
    } 
    return result

}
 */
const signUpUser = async (user, res) => {

    // TODO: registro

    const {name,surname,email,password} = user; 
    const hashPassword = await bcrypt.hash(password, 10);
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion

        if(regex.validateEmail(email) && regex.validatePassword(password)){
        const data = await client.query((queries.signUpUserQuery),[name,surname,email,hashPassword])
        result = data.rowCount
        }else{
            console.log("hola");
       res.status(400).json({msg: 'Invalid email or password'}); 
        }
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

const userAPI = {
    /* loginUser, */
    signUpUser,
    getUsers,
/*     recoverPassword,
    resetPassword,
    logoutUser */
}

module.exports = userAPI;