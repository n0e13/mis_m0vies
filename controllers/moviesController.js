const search = require('../models/moviesModel');


// TODO: aquí la lógica de negocio

const createMovie = async (req,res) => {
    console.log(req.body); // Objeto recibido de entry nueva
    const newEntry = req.body; // {} nuevo producto a guardar
    // Líneas para guardar en una BBDD SQL
    const response = await search.createEntry(newEntry);
    console.log(response);
    res.status(201).json({"items_created":response});
}

const movies = {
   // getMovies,
    createMovie
}

module.exports = movies;