const express = require('express');
const router = express.Router();
const { getWatchlist, addToWatchlist, removeFromWatchlist } = require('../controllers/watchlistController');

router.get('/', getWatchlist);
router.post('/', addToWatchlist);
router.delete('/:id', removeFromWatchlist);

module.exports = router;
