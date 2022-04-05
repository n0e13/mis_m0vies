const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const regex = require('../utils/regex');
const jwt_secret = process.env.ULTRA_SECRET_KEY;
const config = require('../configs/config');
const express = require('express');
const db = require('../models/userAPIModel');
const comparePassword = require("../utils/userAPIUtils");

const refreshTokens = [];


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
    const email = req.body.email;
    const pass = req.body.pass;
    
    if (!email) return res.status(200).send({ success: false, error: "email not provided" });
    if (!pass) return res.status(200).send({ success: false, error: "password not provided" });
    try {
        const users = await db.getUsers();
        const user = users.find(u => { return u.email === email && u.password === pass });
        if(user){
            console.log(user);
            const payload = {
                check:  true
               };
               const token = jwt.sign(payload, config.llave, {
                expiresIn: "1m"
               });
               const refreshToken = jwt.sign(payload,config.refreshTokenSecret);
               refreshTokens.push(refreshToken);
               console.log(refreshTokens);
                console.log({
                mensaje: 'Autenticación correcta',
                token: token,
                refreshToken: refreshToken
               });
               res.cookie("access-token", token, {
                   httpOnly: true,
                   sameSite: "strict",
               }).redirect("http://localhost:3000/dashboard");
           } else {
            res.send('Username or password incorrect');
        }
        }
    catch (error) {
        console.log('Error:', error);
    }
}; 

const signUpUser = async (req, res) => {
    try {
        const newUser = req.body; // {} nuevo user a guardar
        const response = await db.signUpUser(newUser);
        res.status(201).redirect("http://localhost:3000/login");
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

const logoutUser = async (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(token => t !== token);
    res.send("Logout successful");
} 

//-------------------------Esta función loguea los usuarios de la bbdd en la terminal(Descomentar para loguear)--------------//
// const users = (async(req,res)=>{
//     const u = await db.getUsers();
//     console.log(u);        

//-------------------------Esta función loguea los usuarios de la bbdd en la terminal--------------//
const users = (async()=>{
    const u = await db.getUsers();
        /* console.log(u);  */       
    
})();


//------------------------------Esto crea un token si el usuario está en la bbdd---------------//
const authUser = async(req,res)=> {
    const users = await db.getUsers();
    /* console.log(users); */
    if(req.body.usuario === users[i].name && req.body.contrasena === users[i].password) {
        const payload = {
         check:  true
        };
        const token = jwt.sign(payload, app.get('llave'), {
         expiresIn: "24h"
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
    // const datos = await db.getUsers();
    const datos = {
        user: "topotamadre"
    }
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
}

module.exports = user;