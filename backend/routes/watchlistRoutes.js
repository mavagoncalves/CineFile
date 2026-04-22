const express = require('express');
const router = express.Router();
const { 
    getWatchlist, 
    createWatchlistItem, 
    removeFromWatchlist,
    getWatchlistByUser,
    updateWatchlistItem,
    getWatchlistStats 
} = require('../controllers/watchlistController');

router.get('/', getWatchlist);
router.post('/', createWatchlistItem);
router.delete('/:id', removeFromWatchlist);
router.get('/stats', getWatchlistStats);
router.put('/:id', updateWatchlistItem);
router.get('/user/:userId', getWatchlistByUser);

module.exports = router;
