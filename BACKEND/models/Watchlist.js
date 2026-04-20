const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 10
  },
  comment: { type: String, required: true }
});

module.exports = mongoose.model('Watchlist', watchlistSchema);