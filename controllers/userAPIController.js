const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const regex = require('../utils/regex');
const jwt_secret = process.env.ULTRA_SECRET_KEY;
const config = require('../configs/config');
const express = require('express');
const db = require('../models/userAPIModel');

const app = express();
app.set('llave', config.llave);


const onLoad = (req, res) => {
    res.render("auth/home");
}

const getLogin = (req, res) => {
    res.render("auth/login");
}

const getSignUp = (req, res) => {
    res.render("auth/signup");
}

const loginUser = async (req, res) => {
    try {
        // const loginUser = req.body;
        // const response = await db.loginUser(loginUser);
        const email = req.body.email;
        const pass = req.body.pass;
        // const users = await db.getUsers();
        // console.log(users);
        if(email == "1" && pass == "1") {
            // const payload = {
            //  check:  true
            // };
            // const token = jwt.sign(payload, app.get('llave'), {
            //  expiresIn: 1440
            // });
            //  res.json({
            //  mensaje: 'Autenticación correcta',
            //  token: token
            // });
            res.redirect("http://localhost:3000/dashboard");
        } 
        else {
                  res.json({ mensaje: "Usuario o contraseña incorrectos"})
              }
    } catch (error) {
        console.log('Error:', error);
    }
}; 

const signUpUser = async (req, res) => {
    try {

        const newUser = req.body; // {} nuevo user a guardar
        const response = await db.signUpUser(newUser);
        res.status(201).json({ "user_created": response });
    } catch (error) {
        console.log('Error:', error);
    }
}



const recoverPassword = async (req, res) => {
    res.render("auth/recoverPass")
}

const restorePassword = async (req, res) => {
    res.render("auth/restorePass")
}
/*
const logoutUser = async (req, res) => {

} */

//-------------------------Esta función loguea los usuarios de la bbdd en la terminal--------------//
// const users = (async()=>{
//     const u = await db.getUsers();
//     for (let i = 0; i < u.length; i++) {
//         console.log(u);        
//     }
// })();


//------------------------------Esto crea un token si el usuario está en la bbdd---------------//
const authUser = async(req,res)=> {
    const users = await db.getUsers();
    console.log(users);
    if(req.body.usuario === users[i].name && req.body.contrasena === users[i].password) {
        const payload = {
         check:  true
        };
        const token = jwt.sign(payload, app.get('llave'), {
         expiresIn: 1440
        });
         res.json({
         mensaje: 'Autenticación correcta',
         token: token
        });
    } else {
              res.json({ mensaje: "Usuario o contraseña incorrectos"})
          }
}

const dataUser = async (req, res) => {
    const datos = await db.getUsers();
       res.json(datos);
}


const user = {
    onLoad,
    getLogin,
    getSignUp,
    loginUser,
    signUpUser,
    recoverPassword,
    restorePassword,
        // logoutUser 
    authUser,
    dataUser
}

module.exports = user;