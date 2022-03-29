const movieAPI = require('../controllers/moviesAPIController');
const routes = require('express').Router();


// TODO: Faltaría el middleware para comprobar si está logueado y el rol
// routes.get('/movies', );
// routes.post();
// routes.put();
// routes.delete();
// routes.get();
// routes.get();
routes.get('/search',movieAPI.searchFilms);
routes.get('/search/:title?',movieAPI.getFilms);
routes.post('/search',movieAPI.inputFilms)

module.exports = routes;
