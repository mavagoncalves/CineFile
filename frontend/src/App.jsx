import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WatchlistTable from './components/WatchlistTable';
import AddMovieForm from './components/AddMovieForm';
import WatchlistStats from './components/WatchlistStats';
import GenreFilter from './components/GenreFilter';
import PlaylistTabs from './components/PlaylistTabs';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [enteredApp, setEnteredApp] = useState(false);
  const [activePlaylist, setActivePlaylist] = useState('All');


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
 const availablePlaylists = [...new Set(movies.map(item => item.playlistName))].filter(Boolean);

 // applies BOTH the Playlist and Genre filters together
  const displayMovies = movies.filter(item => {
    const matchesPlaylist = activePlaylist === 'All' || item.playlistName === activePlaylist;
    const matchesGenre = selectedGenre === 'All' || item.movie?.genre === selectedGenre;
    return matchesPlaylist && matchesGenre;
  });
  
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

if (!enteredApp) {
    return (
      <div className="landing-screen">
        <div className="landing-content">
          <h1 className="landing-title">CineFile</h1>
          <p className="landing-subtitle">Your personalized cinematic universe.</p>
          <p className="landing-description">
            Create custom watchlists, track your favorite directors, and curate your ultimate movie collection.
          </p>
          <button className="enter-btn" onClick={() => setEnteredApp(true)}>
            Enter Your Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>CineFile</h1>
      
      {error && <div className="error" style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
      
      <WatchlistStats movies={movies} />
      
      <AddMovieForm onMovieAdded={fetchWatchlist} />
      
      <PlaylistTabs 
        playlists={availablePlaylists} 
        activePlaylist={activePlaylist} 
        onSelect={setActivePlaylist} 
      />

      <GenreFilter 
        genres={availableGenres} 
        currentGenre={selectedGenre} 
        onGenreChange={setSelectedGenre} 
      />

      {loading && movies.length === 0 ? (
        <div className="loading" style={{ textAlign: 'center', color: 'var(--text-gray)' }}>
          Curating your movies...
        </div>
      ) : (
        <WatchlistTable 
          movies={displayMovies} 
          onDelete={handleDelete} 
          onUpdateRating={handleUpdateRating}
        />
      )}
    </div>
  );
}

export default App;
