const movies = require('../models/moviesAPIModel');
const search = require('../utils/moviesAPIUtils');
const scraperS = require('../utils/scrap_sensacine.js');
const scraperF = require('../utils/scrap_filmaffinity.js');


const dashboard = (req, res) => {
    res.render("user/dashboard");
}

const searchFilms = (req, res) => {
    res.render("user/search");
}

const getFilms = async (req, res) => {
    if (req.params.title) {
        const film = await search.getFilmsByTitle(req.params.title);//Devuelve 1
        const f = film.results
        res.render("user/searchTitle", { "films": f });//Pinta datos en el pug. Aquí hemos metido data en un objeto para  que con la plantilla del pug lo coja.
    }
}

const inputFilms = (req, res) => {
    const films = req.body.films;
    res.render(`http://localhost:3000/search/${films}`)
}

const showFilm = async (req, res) => {
    if (req.params.title) {
        const filmInfo = await search.getFilmInfo(req.params.title);//Devuelve 1
        scraperS.scrap_sensacine(req.params.title) // scrapping de la pelicula que se busque.
        scraperF.scrap_sensacine(req.params.title) // scrapping de la pelicula que se busque.
        res.render("user/searchMovieTitle", { "film": filmInfo });
    };
};

//-------Esta se encarga de las pelis favoritas----//
const myMovies = async (req, res) => {
    //TODO: if else para saber si es admin o user

    // Admin
    const aMovies = await movies.getAllMovies();
    res.render("user/myMovies", { "films": aMovies });
}

const createMovieView = (req, res) => {
    res.render("admin/createMovie")
}

const createMovie = async (req, res) => {
    const newMovie = req.body; // {} nuevo producto a guardar
    const response = await movies.createMovie(newMovie);
    res.render("admin/createMovie");
}

const updateMovieView = (req, res) => {
    res.render("admin/editMovie")
}

const updateMovie = async (req, res) => {
    const updatedMovie = req.body;
    await movies.updateMovie(updatedMovie);
}

const deleteMovieView = (req, res) => {
    res.render("admin/removeMovie");
}

const deleteMovie = async (req, res) => {
    const deleteMovieById = req.body.id;
    console.log(deleteMovieById);
    await movies.deleteMovie(deleteMovieById);
    //TODO: falta recargar la vista y borrar las relaciones con esa peli en SQL
}


const movie = {
    //ADMIN
    createMovie,
    createMovieView,
    updateMovie,
    updateMovieView,
    deleteMovie,
    deleteMovieView,
    //USER
    searchFilms,
    getFilms,
    inputFilms,
    showFilm,
    dashboard,
    myMovies//Esta la comparten admin y user
}

module.exports = movie;