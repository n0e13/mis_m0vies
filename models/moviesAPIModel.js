require('dotenv').config();
const { ObjectId } = require('mongodb');
const Movie = require("./movieSchemaModel");
const queries = require('../utils/queries.js'); 
const pool = require('../utils/dbconfig-pg.js');
const db = require('../models/userAPIModel');
const jwt = require('jsonwebtoken');
const config = require('../configs/config');

const getMovieById = async (id) => {
    const oId = new ObjectId(id);
    const movie = await Movie.findById({ _id: oId });
    return movie;
}

const getAllMovies = async () => {
    const aMovies = await Movie.find({});
    return aMovies;
}

const getFavs = async () => {
    const mongoIDs = [];
    const sqlIDs = [];
    //const token = (req.headers.cookie).slice(13);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyYW5jb0BnbWFpbC5jb20iLCJjaGVjayI6dHJ1ZSwiaWF0IjoxNjQ5MzI2MDMxLCJleHAiOjE2NDkzMjcyMzF9.RFIe1DBbg-gMOpdAj4kfp7A_C1gGX0OWzE7hhnT5D6s"
    const decoded = jwt.verify(token, config.llave)
    let client,result;
    client = await pool.connect();
    try{
        const data = await client.query(queries.getFavs,["franco@gmail.com"]);
        console.log(data.rows);
    }
    catch(err){
        console.log(err);
        throw err;
    }
}
getFavs()


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


const movieAPI = {
    getMovieById,
    getAllMovies,
    //getFavs,
    createMovie,
    updateMovie,
    deleteMovie
}  

module.exports = movieAPI;
 
