const express = require('express');
const router = express.Router();
const { 
    getWatchlist, 
    createWatchlistItem, 
    removeFromWatchlist,
    getWatchlistStats 
} = require('../controllers/watchlistController');

router.get('/', getWatchlist);
router.post('/', createWatchlistItem);
router.delete('/:id', removeFromWatchlist);
router.get('/stats', getWatchlistStats);

module.exports = router;
