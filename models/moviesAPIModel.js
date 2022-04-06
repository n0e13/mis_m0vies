require('dotenv').config();
const { ObjectId } = require('mongodb');
const Movie = require("./movieSchemaModel");

const getMovieById = async (id) => {
    const oId = new ObjectId(id);
    const movie = await Movie.findById({ _id: oId });
    return movie;
}

const getAllMovies = async () => {
    const aMovies = await Movie.find({});
    return aMovies;
}


const createMovie = async (movie) => {
    const newMovie = new Movie(movie);
    await Movie.create(newMovie);
}


const updateMovie = async (movie) => {
    let movieId = movie._id;
    const oId = new ObjectId(movieId);
    const movieToUpdate = await Movie.findById({ _id: oId })
    const updatedMovie = new Movie({
        title: movie.title,
        year: movie.year,
        director: movie.director,
        casting: movie.casting,
        plot: movie.plot,
        genre: movie.genre,
        rating: movie.rating,
        duration: movie.duration,
        image: movie.image
    });
    movieToUpdate.overwrite(updatedMovie);
    await movieToUpdate.save();
}


const deleteMovie = async (id) => {
    /* console.log(id); */
    await Movie.deleteOne({ _id: id });
}


const movieAPI = {
    getMovieById,
    getAllMovies,
    createMovie,
    updateMovie,
    deleteMovie
}
module.exports = movieAPI;

