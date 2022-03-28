const mongoose = require('mongoose');

const objectSchema = {
    id: { 
        type: Number, 
        required: true,
        unique: true
    },
    title: { 
        type: String, 
        required: true 
    },
    year: { 
        type: Number, 
        required: true 
    },
    director: { 
        type: String, 
        required: true 
    },
    genre: { 
        type: String, 
        required: true 
    },
    duration: { 
        type: String, 
        required: true 
    },
    image:{
        type: String,
        validate: {
            validator: function(url){
                return url.indexOf('.jpg') != -1;
            }, 
            message: "Porfa, sólo imágenes JPG"
        }
    }
};
// Crear el esquema
const movieSchema = mongoose.Schema(objectSchema);
// Crear el modelo --> Colección
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
