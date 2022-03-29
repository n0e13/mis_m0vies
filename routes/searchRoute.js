const search = require('../controllers/searchController');
const express = require('express');
const router = express.Router();


router.get('/search',search.searchFilms);
router.get('/search/:title?',search.getFilms);

router.post('/search',search.inputFilms)


module.exports = router;
