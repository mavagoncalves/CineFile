const Movie = require('../models/Movie');

// Get all movies
exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new movie entry
exports.createMovie = async (req, res) => {
    try {
        const newMovie = await Movie.create(req.body);
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(400).json({ message: "Validation failed", error: error.message });
    }
};

// Search movies
exports.searchMovies = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q || q.length < 2) return res.json([]); // Only search if 2+ characters

        const movies = await Movie.find({ 
            title: { $regex: q, $options: 'i' } 
        }).limit(5); // Only return top 5 matches

        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: "Search failed" });
    }
};