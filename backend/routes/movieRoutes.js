const express = require('express');
const router = express.Router();
const { getMovies, createMovie, searchMovies } = require('../controllers/movieController');

router.get('/', getMovies);
router.post('/', createMovie);
router.get('/search', searchMovies);

module.exports = router;