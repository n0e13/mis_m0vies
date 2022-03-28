const express = require('express')
const router = express.Router();

const saerch = require('../controllers/moviesController');

// TODO: enrutamiento

router.post('/entries',entries.createEntry);

module.exports = router;