import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WatchlistTable from './components/WatchlistTable';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleDelete = async (id) => {
    if (window.confirm("Remove this movie from CineFile?")) {
      await axios.delete(`http://localhost:5000/api/watchlist/${id}`);
      fetchWatchlist();
    }
  };

  return (
    <div className="App">
      <h1>CineFile Dashboard</h1>
      {loading && <p>Loading your movies...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {!loading && (
        <WatchlistTable movies={movies} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default App;
