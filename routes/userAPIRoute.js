const { Router } = require('express');
const userAPI = require('../controllers/userAPIController');
const routes = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../configs/config');


routes.get('/', userAPI.onLoad);
routes.get('/signup', userAPI.getSignUp);
routes.post('/signup', userAPI.signUpUser);
routes.get('/login', userAPI.getLogin);
routes.post('/login', userAPI.loginUser);
routes.get('/logout', userAPI.logoutUser)
routes.get('/recoverpassword/', userAPI.recoverPassView);
routes.post('/recoverpassword/',userAPI.recoverPass);
routes.get('/restorepassword/:recoverToken', userAPI.restorePassView);
routes.post('/restorepassword/:recoverToken',userAPI.restorePass);

routes.get('/google',userAPI.google);
routes.get('/auth/google', userAPI.googleAuth);
routes.get('/google/callBack',userAPI.googleCallBack, function(req,res){
    const name = req.user.name.givenName;
    const payload = {
    check:  true
    };
    const token = jwt.sign(payload, config.llave, {
    expiresIn: "20m"
    });
    res.cookie("access-token", token, {
        httpOnly: true,
        sameSite: "strict",
    }).send(`Bienvenid@ ${name}. Te has logueado con éxito, haz click para ir a la web: <a href='/dashboard'>MovieApp</a>`);
})
routes.get('/auth/failure',(req,res)=>{
    res.send('Something went wrong..')
});


module.exports = routes;