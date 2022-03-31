
require('dotenv').config();
const Movie = require("./movieSchemaModel")
const getMovieByTitle = async (email) => {
    // TODO: getMovieByTitle muestra la vista detallada de una peli
}
const getAllMovies = async (email) => {
    // TODO: getAllMovies cuando busca una película
}
const createMovie = async (movie) => {
    // TODO: createMovie solo admin
    const { newTitle, newYear, newDirector, newGenre, newDuration, newImage } = movie;
    const newMovie = {
        title: newTitle,
        year: newYear,
        director: newDirector,
        genre: newGenre,
        duration: newDuration,
        image: newImage
    };
    await Movie.create(newMovie)
}
/*
const entry = { newTitle: "304958", newYear: 1998,newDirector: "juanito", newGenre: "miedo", newDuration: "9934857390", newImage: "http...." }
createMovie(entry);
 */
const updateMovie = async (movie) => {
    // TODO: updateMovie solo admin
    const { title, newTitle, newYear, newDirector, newGenre, newDuration, newImage } = movie;
    const movieToUpdate = await Movie.findOne({title: title})
    const updatedMovie = {
        title: newTitle,
        year: newYear,
        director: newDirector,
        genre: newGenre,
        duration: newDuration,
        image: newImage
    };
    movieToUpdate.overwrite(updatedMovie);
    await movieToUpdate.save();
}
/* const entry = { title: "asd", newTitle: "nuevotítulo", newYear: 2345234,newDirector: "pepi", newGenre: "comedia", newDuration: "123", newImage: "http...." }
updateMovie(entry);
 */
const deleteMovie = async (movie) => {
    // TODO: deleteMovie solo admin
    const { title } = movie;
    await Movie.deleteOne({title: title});
}
const entry = {title: "nuevotítulo"}
deleteMovie(entry);
const movieAPI = {
    // getMovieByTitle,
    // getAllMovies,
    createMovie,
    updateMovie,
    deleteMovie
}
module.exports = movieAPI;

