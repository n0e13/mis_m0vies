require('dotenv').config(); //dotenv
const express = require('express');
const queries = require('../utils/queries.js');
const pool = require('../utils/dbconfig-pg.js');
const regex = require('../utils/regex');
const bcrypt = require('bcrypt'); //bcrypt --> encript password
const config = require('../configs/config');



//-------------------------Esta función trae todos los usuarios de la bbdd---------------------//
const getUsers = async () => {
    let client, result;
    client = await pool.connect();
    try {
        const data = await client.query((queries.getUsersQuery));
        result = data.rows;
    }
    catch {
        console.log(err);
        throw err;
    }
    finally {
        client.release();
    }
    return result
}


const signUpUser = async (user, res) => {
    const { name, surname, email, pass, pass2 } = user;
    const hashPassword = await bcrypt.hash(pass, 10);
    let client, result;
    client = await pool.connect(); // Espera a abrir conexion
    try {
        if (regex.validateEmail(email) && regex.validatePassword(pass) && pass == pass2 && regex.validateName(name) && regex.validateName(surname)) {
            const data = await client.query((queries.signUpUserQuery), [name, surname, email, hashPassword])
            result = data.rowCount;
        } else {
            res.status(400).json({ msg: 'Incorrect data provided' });
        }
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
}

const getUserByEmail = async(email)=>{
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query((queries.getUsersByEmail),[email]);
        result = data.rows;
    }
    catch {
        console.log(err);
        throw err;
    }
    finally {
        client.release();
    }
    return result
}



const userAPI = {
    signUpUser,
    getUsers,
    getUserByEmail
}

module.exports = userAPI;