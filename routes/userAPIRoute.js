const userAPI = require('../controllers/userAPIController');
const routes = require('express').Router();


routes.post('/login', userAPI.loginUser);
routes.post('/signup', userAPI.signUpUser);
routes.get('/logout/:email', userAPI.logoutUser)
routes.get('/recoverpassword/:email', userAPI.recoverPassword);
routes.put('/resetpassword/:recoverToken', userAPI.resetPassword);
