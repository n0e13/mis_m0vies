const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const regex = require('../utils/regex');
const jwt_secret = process.env.ULTRA_SECRET_KEY;
const config = require('../configs/config');
const express = require('express');
const db = require('../models/userAPIModel');
const transporter = require('../configs/nodemailer'); 7
const pool = require('../utils/dbconfig-pg.js');


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
        const user = users.find(u => { return u.email === email });
        if (user) {
            const match = await bcrypt.compare(pass, user.password);
            console.log(user);
            const payload = {
                check: true
            };
            const token = jwt.sign(payload, config.llave, {
                expiresIn: "1h"
            });
            const refreshToken = jwt.sign(payload, config.refreshTokenSecret);
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
            }).redirect(`${process.env.URL_BASE}/dashboard`);
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
        res.status(201).redirect(`${process.env.URL_BASE}/login`);
    } catch (error) {
        console.log('Error:', error);
    }
}

const recoverPassView = (req, res) => {
    ////Esta es de las vistas/////////
    res.render("auth/recoverPass")
}

const recoverPass = async (req, res) => {
    try {
        const recoverToken = jwt.sign({ email: req.body.email }, config.llaveRecover, { expiresIn: '10m' });
        const url = `http://localhost:3000/restorepassword/` + recoverToken;
        await transporter.sendMail({
            to: req.body.email,
            subject: 'Recover Password',
            html: `<h3>Recover Password</h3>
                <a href = ${url}>Click to recover password</a>
                <p>Link will expire in 10 minutes</p>`
        });
        res.json({
            message: 'Un enlace para reestablecer tu contraseña ha sido enviado a tu email. Mira en la carpeta de spam si no lo encuentras.'
        })
    } catch (error) {
        console.log('Error:', error)
    }
}


const restorePassView = (req, res) => {
    res.render("auth/restorePass")
}

const restorePass = async (req, res) => {
    console.log("hola");
    try {
        let client;
        const users = await db.getUsers();
        const recoverToken = req.params.recoverToken;
        const payload = jwt.verify(recoverToken, config.llaveRecover);
        console.log(payload.email);
        const pass = req.body.pass1
        const pass2 = req.body.pass2
        const user = users.find(u => { return payload.email === u.email });
        if (user) {
            if (regex.validatePassword(pass) && pass == pass2) {
                client = await pool.connect();
                const hashPassword = await bcrypt.hash(pass, 10);
                await client.query(
                    `UPDATE users
                    SET password = ($1)
                    WHERE email = ($2)`, [hashPassword, payload.email]);
                res.status(200).redirect("http://localhost:3000/login");
            }
            else if (pass != pass2) {
                res.send("Passwords dont match");
            }
            else {
                res.status(400).json({ msg: 'Password must have at least 8 characters, one uppercase, one lowercase and one special character' });
            }
        }
        else {
            res.send("No se encontró ninguna dirección de email")
        }
    } catch (error) {
        console.log('Error:', error);
    }
}

const logoutUser = async (req, res) => {
    res.clearCookie("access-token").redirect("http://localhost:3000/")
}

//-------------------------Esta función loguea los usuarios de la bbdd en la terminal(Descomentar para loguear)--------------//
// const users = (async(req,res)=>{
//     const u = await db.getUsers();
//     console.log(u);        

//-------------------------Esta función loguea los usuarios de la bbdd en la terminal--------------//
const users = (async () => {
    const u = await db.getUsers();
    /* console.log(u);  */

})();


//------------------------------Esto crea un token si el usuario está en la bbdd---------------//
const authUser = async (req, res) => {
    const users = await db.getUsers();
    /* console.log(users); */
    if (req.body.usuario === users[i].name && req.body.contrasena === users[i].password) {
        const payload = {
            check: true
        };
        const token = jwt.sign(payload, app.get('llave'), {
            expiresIn: "24h"
        });
        res.json({
            mensaje: 'Autenticación correcta',
            token: token
        });
    } else {
        res.json({ mensaje: "Usuario o contraseña incorrectos" })
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
    recoverPassView,
    recoverPass,
    restorePassView,
    restorePass,
    logoutUser
}

module.exports = user;