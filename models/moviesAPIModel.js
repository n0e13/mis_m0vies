
require('dotenv').config();
const Movie = require("./movieSchemaModel");
const queries = require('../utils/queries.js'); 
const pool = require('../utils/dbconfig-pg.js');

/* const getMovieByTitle = async (email) => {
    // TODO: getMovieByTitle muestra la vista detallada de una peli
} */
/* const getAllMovies = async (email) => {
    const aMovies = await Movie.find({});
    return aMovies;
}


const createMovie = async (movie) => {
    const newMovie = new Movie(movie);
    await Movie.create(newMovie);
}


const updateMovie = async (movie) => {
    const movieToUpdate = await Movie.findOne({ title: movie.title })
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
 */

const deleteMovie = async (id) => {
    /* console.log(id); */
    await Movie.deleteOne({ _id: id })

    //borrar de SQL también
    let client,result;
    client = await pool.connect();
    try{
        const data = await client.query(queries.deleteMovieQuery,[id]);
        result = data.rows;
    }
    catch(err){
        console.log(err);
        throw err;
    }
    finally{
        client.release();
    }
    return result;
}

deleteMovie('624d9efcf94e91c0bec14ec2');


/* const movieAPI = {
    // getMovieByTitle,
    getAllMovies,
    createMovie,
    updateMovie,
    deleteMovie
} */
/* module.exports = movieAPI;
 */
