const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  movie: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Movie', 
    required: true 
  },
  rating: { 
    type: Number, 
    min: 1, 
    max: 10, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Plan to Watch', 'Watching', 'Completed'], 
    default: 'Plan to Watch' 
  },
  comment: { type: String }
});

module.exports = mongoose.model('Watchlist', watchlistSchema);