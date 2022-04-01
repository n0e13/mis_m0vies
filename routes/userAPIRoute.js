const { Router } = require('express');
const userAPI = require('../controllers/userAPIController');
const routes = require('express').Router();


routes.get('/', userAPI.onLoad);
routes.get('/login', userAPI.getLogin);
routes.get('/signup', userAPI.getSignUp);
//routes.post('/login', userAPI.loginUser);
routes.post('/signup', userAPI.signUpUser);
// routes.post('/logout/:email', userAPI.logoutUser)
// routes.get('/recoverpassword/:email', userAPI.recoverPassword);
// routes.put('/resetpassword/:recoverToken', userAPI.resetPassword);


//-------Estas dos rutas son del token(PRUEBA)-------------//
routes.post("/autenticar",userAPI.authUser);
routes.get("/datos", userAPI.dataUser);



module.exports = routes;
