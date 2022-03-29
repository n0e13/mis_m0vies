// Módulos externos
const express = require('express');

// Rutas
const searchRouter = require('./routes/searchRoute');
// const movieRouter = require('./routes/moviesRoute');

const app = express();
const port = 3000;

// Motor de vistas PUG
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.json());

// Rutas
app.use("/api", searchRouter);
// app.use("/api", movieRouter);

// Middleware de rutas inexistentes
// app.use(notFound);

// Necesario para pasar el test
const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = server;