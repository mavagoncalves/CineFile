const Watchlist = require('../models/Watchlist');
const Movie = require('../models/Movie');

// Adds movie to watchlist
exports.createWatchlistItem = async (req, res) => {
    try {
        const { title, director, rating, comment, genre, status, userId } = req.body;

        // Check if the movie already exists in your 'movies' collection
        let movie = await Movie.findOne({ title: new RegExp(`^${title}$`, 'i') });

        // If it doesn't exist, create it in the library first
        if (!movie) {
            movie = await Movie.create({ title, director, genre});
        }

        // create the watchlist entry using the Movie's ID
        const newItem = await Watchlist.create({
            user: userId || "69e773f9dba1e6145d3fd694",
            movie: movie._id,
            rating,
            comment,
            status: status || 'Plan to Watch'
        });

        // Send back the new item
        const populatedItem = await Watchlist.findById(newItem._id).populate('movie');
        
        res.status(201).json(populatedItem);
    } catch (error) {
        console.error("Create Error:", error);
        res.status(400).json({ message: "Failed to add movie", error: error.message });
    }
};

// GET all items in a user's watchlist
exports.getWatchlist = async (req, res) => {
  try {
    // .populate('movie') replaces the ID with the actual movie data
    const list = await Watchlist.find().populate('movie');
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: "Error fetching watchlist", error: error.message });
  }
};

// Get a specific user's watchlist
exports.getWatchlistByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const userList = await Watchlist.find({ user: userId }).populate('movie');
        
        if (!userList || userList.length === 0) {
            return res.status(404).json({ message: "No watchlist found for this user." });
        }
        
        res.status(200).json(userList);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// DELETE an item
exports.removeFromWatchlist = async (req, res) => {
  try {
    const deletedItem = await Watchlist.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Removed from watchlist" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET average rating of the user's watchlist
exports.getWatchlistStats = async (req, res) => {
  try {
    const stats = await Watchlist.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
          totalMovies: { $sum: 1 }
        }
      }
    ]);
    res.status(200).json(stats[0] || { avgRating: 0, totalMovies: 0 });
  } catch (error) {
    res.status(500).json({ message: "Error calculating stats", error: error.message });
  }
};

// Update watchlist item 
exports.updateWatchlistItem = async (req, res) => {
  try {
    const updatedItem = await Watchlist.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true } //mongoose validation
    ).populate('movie');

    if (!updatedItem) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};