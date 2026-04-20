const Watchlist = require('../models/Watchlist');

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

// POST a new movie to the watchlist
exports.addToWatchlist = async (req, res) => {
  try {
    const newItem = new Watchlist(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: "Validation failed", error: error.message });
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