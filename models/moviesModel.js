//TODO: llamadas a la BD para mostrar las pelis

//require('../utils/dbMongoUtil');
const Movie = require('./movieSchemaModel');

const createEntry = async (entry) => {
    const { newTitle, newYear, newDirector, newGenre, newDuration, newImage } = entry;

    const movie = {
        title: newTitle,
        year: newYear,
        director: newDirector,
        genre: newGenre,
        duration: newDuration,
        image: newImage
    };
    await Movie.create(movie)
}

/* 
const entry = { newTitle: "asd", newYear: 1998,newDirector: "juanito", newGenre: "miedo", newDuration: "143", newImage: "http...." }
createEntry(entry);
*/

const entries = {
    createEntry
}

module.exports = entries;
