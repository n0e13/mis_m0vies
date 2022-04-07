require('dotenv').config(); //dotenv
const express = require('express');
const queries = require('../utils/queries.js');
const pool = require('../utils/dbconfig-pg.js');
const regex = require('../utils/regex');
const bcrypt = require('bcrypt'); //bcrypt --> encript password
const config = require('../configs/config');



const loginUser = async () => {
    let data;
    try {
        const { email, password } = user
        data = await client.query(queries.getUsersQuery)
        result = data.rows

        if (!data) {
            res.status(400).json({ msg: 'Incorrect user or password' });
        } else {
            const match = await bcrypt.compare(password, data.hashPassword);
            if (match) {
                const email = data;
                const userForToken = {
                    email: email
                };
                const token = jwt.sign(userForToken, { expiresIn: '20m' });
                res
                    .status(200)
                    .json({
                        msg: 'Correct authentication',
                        token: token
                    });
            } else {
                res.status(400).json({ msg: 'Incorrect user or password' });
            }
        }
    } catch (error) {
        console.log('Error:', error);
    } finally {
        client.release();
    }

    return result

}




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
    console.log(user);
    const hashPassword = await bcrypt.hash(pass, 10);
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        if (regex.validateEmail(email) && regex.validatePassword(pass) && pass == pass2) {
            const data = await client.query((queries.signUpUserQuery), [name, surname, email, hashPassword])
            result = data.rowCount;
        } else {
            res.status(400).json({ msg: 'Invalid email or password' });
        }
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
}



const userAPI = {
    loginUser,
    signUpUser,
    getUsers,
}

module.exports = userAPI;