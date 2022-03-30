const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const regex = require('../utils/regex');
const jwt_secret = process.env.ULTRA_SECRET_KEY;
const config = require('../configs/config');
const express = require('express');

const db = require('../models/userAPIModel');


// TODO: aquí la lógica de negocio
const app = express();
app.set('llave', config.llave);

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

const authUser = async(req,res)=> {
    if(req.body.usuario === "hola" && req.body.contrasena === "holamundo") {
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

const dataUser = async(req,res)=>{
    const datos = [
        { id: 1, nombre: "Pepe el de los palotes" },
        { id: 2, nombre: "Michel de Motril"}
       ];
       
       res.json(datos);
      ;
}


const user = {
    /*   loginUser, */
    signUpUser,
    /*     recoverPassword,
        resetPassword,
        logoutUser */
    authUser,
    dataUser
}

module.exports = user;

