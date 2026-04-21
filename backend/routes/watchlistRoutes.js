const express = require('express');
const router = express.Router();
const { getWatchlist, addToWatchlist, removeFromWatchlist, getWatchlistStats } = require('../controllers/watchlistController');

router.get('/', getWatchlist);
router.post('/', addToWatchlist);
router.get('/stats', getWatchlistStats);
router.delete('/:id', removeFromWatchlist);

module.exports = router;
