const express = require('express');
const router = express.Router();
const { getWatchlist, addToWatchlist, removeFromWatchlist, getWatchlistStats } = require('../controllers/watchlistController');

router.get('/', getWatchlist);
router.post('/', addToWatchlist);
router.delete('/:id', removeFromWatchlist);
router.get('/stats', getWatchlistStats);

module.exports = router;
