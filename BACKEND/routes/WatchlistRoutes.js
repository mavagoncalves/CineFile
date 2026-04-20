const express = require('express');
const router = express.Router();
const { getPlaylists, addMovieToList } = require('../controllers/playlistController');

router.get('/', getWatchlists);
router.post('/', addMovieToList);

module.exports = router;