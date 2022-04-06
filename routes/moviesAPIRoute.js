const movieAPI = require('../controllers/moviesAPIController');
const routes = require('express').Router();
const protectedRoutes = require("../middlewares/verifiedToken");


// TODO: Faltaría el middleware para comprobar si está logueado y el rol


routes.get("/dashboard", protectedRoutes, movieAPI.dashboard)
routes.get('/search', protectedRoutes, movieAPI.searchFilms);
routes.get('/search/:title?', protectedRoutes, movieAPI.getFilms);
routes.get('/movie/:title?', protectedRoutes, movieAPI.showFilm);
routes.post('/search', protectedRoutes, movieAPI.inputFilms);
routes.get("/movies", protectedRoutes, movieAPI.myMovies);

//CRUD DEL ADMIN
routes.get('/movies', protectedRoutes, movieAPI.myMovies);
routes.get("/createMovie", protectedRoutes, movieAPI.createMovieView);
routes.post('/createMovie', protectedRoutes, movieAPI.createMovie);
routes.get("/editMovie/:id", protectedRoutes, movieAPI.updateMovieView)
routes.post("/editMovie/:id", protectedRoutes, movieAPI.updateMovie);
routes.get("/removeMovie", protectedRoutes, movieAPI.deleteMovieView);
routes.post("/removeMovie", protectedRoutes, movieAPI.deleteMovie);



module.exports = routes;