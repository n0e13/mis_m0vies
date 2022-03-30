const movies = require('../models/moviesAPIModel');
const search = require('../utils/moviesAPIUtils')

// TODO: lógica de negocio

const searchFilms = (req,res) =>{
    res.render("user/search.pug")
}

const getFilms = async (req,res) => {
    if(req.params.title){
        const film = await search.getFilmsByTitle(req.params.title);//Devuelve 1
        const f = film.results
        res.render("user/searchTitle.pug",{"films":f});//Pinta datos en el pug. Aquí hemos metido data en un objeto para  que con la plantilla del pug lo coja.
      } 
}

const inputFilms = (req,res) =>{
    const films =  req.body.films;
    console.log(req.body.films);
    res.redirect(`http://localhost:3000/search/${films}`)
}

const showFilm = async (req,res) =>{
    if(req.params.title){
        const films = await search.getFilmsByTitle(req.params.title);//Devuelve 1
        const film = films.results;
        film.forEach(f => {
            res.render("user/searchMovieTitle.pug", {"film":f[0]});
        });
    };
};

const createMovie = async (req, res) => {
    console.log(req.body); // Objeto recibido de entry nueva
    const newEntry = req.body; // {} nuevo producto a guardar
    // Líneas para guardar en una BBDD SQL
    const response = await search.createEntry(newEntry);
    console.log(response);
    res.status(201).json({"items_created":response});
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
    showFilm
}

module.exports = movie;