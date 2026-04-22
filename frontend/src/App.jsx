import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WatchlistTable from './components/WatchlistTable';
import AddMovieForm from './components/AddMovieForm';
import WatchlistStats from './components/WatchlistStats';
import GenreFilter from './components/GenreFilter';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('All');


  const fetchWatchlist = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/watchlist');
      setMovies(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to load CineFile watchlist.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh with setInterval and cleanup
  useEffect(() => {
    fetchWatchlist(); // Initial fetch

    const interval = setInterval(() => {
      fetchWatchlist();
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval); // Cleanup
  }, []);

  const availableGenres = [...new Set(movies.map(item => item.movie?.genre))].filter(Boolean);
  const filteredMovies = selectedGenre === 'All' 
    ? movies 
    : movies.filter(item => item.movie?.genre === selectedGenre);
  
  const handleDelete = async (id) => {
    if (window.confirm("Remove this movie from CineFile?")) {
      await axios.delete(`http://localhost:5000/api/watchlist/${id}`);
      fetchWatchlist();
    }
  };

  const handleUpdateRating = async (id) => {
    const newRating = prompt("Enter new rating (1-10):");
    if (!newRating || isNaN(newRating)) return;

    try {
        await axios.put(`http://localhost:5000/api/watchlist/${id}`, {
            rating: Number(newRating)
        });
        fetchWatchlist(); // Auto-refresh the list after update 
    } catch (err) {
        alert("Failed to update rating");
    }
};

  return (
    <div className="App">
      <h1>CineFile</h1>
      
      {error && <div className="error">{error}</div>}
      
      <WatchlistStats movies={movies} />
      <AddMovieForm onMovieAdded={fetchWatchlist} />
      
      <GenreFilter 
        genres={availableGenres} 
        currentGenre={selectedGenre} 
        onGenreChange={setSelectedGenre} 
      />

      {loading && movies.length === 0 ? (
        <div className="loading">Curating your movies...</div>
      ) : (
        <WatchlistTable movies={filteredMovies} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default App;
