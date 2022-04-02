const { Router } = require('express');
const userAPI = require('../controllers/userAPIController');
const routes = require('express').Router();


routes.get('/', userAPI.onLoad);
routes.get('/signup', userAPI.getSignUp);
routes.post('/signup', userAPI.signUpUser);
routes.get('/login', userAPI.getLogin);
routes.post('/login', userAPI.loginUser);
// routes.post('/logout/:email', userAPI.logoutUser)
routes.get('/recoverpassword', userAPI.recoverPassword);
routes.post('/recoverpassword',userAPI.recoverPassword);
routes.get('/restorepassword', userAPI.restorePassword);
routes.put('/restorepassword',userAPI.restorePassword);


//-------Estas dos rutas son del token(PRUEBA)-------------//
routes.post("/autenticar",userAPI.authUser);
routes.get("/datos", userAPI.dataUser);



module.exports = routes;
