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
    res.redirect(`https://localhost:3000/api/search/${films}`)
}

const createMovie = async (req, res) => {

}

const updateMovie = async (req, res) => {

}

const deleteMovie = async (req, res) => {

}


const movie = {
    // getMovieByTitle,
    // getAllMovies,
    // createMovie,
    // updateMovie,
    // deleteMovie,
    searchFilms,
    getFilms,
    inputFilms
}

module.exports = movie;