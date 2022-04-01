const movies = require('../models/moviesAPIModel');
const search = require('../utils/moviesAPIUtils')

const dashboard = (req,res) => {
    res.render("user/dashboard.pug");
}

const searchFilms = (req, res) => {
    res.render("user/search.pug");
}

const getFilms = async (req, res) => {
    if (req.params.title) {
        const film = await search.getFilmsByTitle(req.params.title);//Devuelve 1
        const f = film.results
        res.render("user/searchTitle.pug", { "films": f });//Pinta datos en el pug. Aquí hemos metido data en un objeto para  que con la plantilla del pug lo coja.
    }
}

const inputFilms = (req, res) => {
    const films = req.body.films;
    console.log(req.body.films);
    // TODO: Hay que quitar esta URL de local
    res.redirect(`http://localhost:3000/search/${films}`)
}

const showFilm = async (req, res) => {
    if (req.params.title) {
        const filmInfo = await search.getFilmInfo(req.params.title);//Devuelve 1
        console.log("info de la peli",filmInfo);
        res.render("user/searchMovieTitle", { "film": filmInfo });
    };
};

//-------Esta se encarga de las pelis favoritas----//
const myMovies = async (req,res)=>{
    //Aqui dentro va toda la movida del fetch a nuestras pelis favoritas y que se rendericen...
    //-----------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------
    res.render("user/myMovies.pug");
}

const createMovie = async (req, res) => {
    console.log(req.body); // Objeto recibido de entry nueva
    const newEntry = req.body; // {} nuevo producto a guardar
    // Líneas para guardar en una BBDD SQL
    const response = await search.createEntry(newEntry);
    res.status(201).json({ "items_created": response });
}

const updateMovie = async (req, res) => {

}

const deleteMovie = async (req, res) => {

}


const movie = {
    // getMovieByTitle,
    // getAllMovies,
    createMovie,
    // updateMovie,
    // deleteMovie,
    searchFilms,
    getFilms,
    inputFilms,
    showFilm,
    dashboard,
    myMovies
}

module.exports = movie;