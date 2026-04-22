import React, { useState } from 'react';
import axios from 'axios';

const AddMovieForm = ({ onMovieAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    genre: '',
    rating: 5,
    comment: '',
    status: 'Plan to Watch',
    playlistName: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // backend handles the ID lookup
      await axios.post('http://localhost:5000/api/watchlist', {
        ...formData,
        userId: "69e773f9dba1e6145d3fd694"
      });

      onMovieAdded();
      
      // Reset form
      setFormData({ 
        title: '', 
        director: '', 
        rating: 5, 
        comment: '', 
        status: 'Plan to Watch',
        playlistName: '',
      });
    } catch (err) {
      console.error(err);
      alert("Error adding movie. Check your console!");
    }
  };

  return (
    <form className="add-movie-form" onSubmit={handleSubmit}>
      <h3 style={{ gridColumn: '1 / -1', color: 'var(--primary)' }}>Add to Your Watchlist</h3>
      
      <input 
        type="text" 
        placeholder="Movie Title" 
        value={formData.title} 
        onChange={(e) => setFormData({...formData, title: e.target.value})} 
        required 
      />

      <input 
        type="text" 
        placeholder="Director" 
        value={formData.director} 
        onChange={(e) => setFormData({...formData, director: e.target.value})} 
        required 
      />

      <input 
        type="text" 
        placeholder="Genre (e.g., Sci-Fi, Action)" 
        value={formData.genre} 
        onChange={(e) => setFormData({...formData, genre: e.target.value})} 
        required 
      />

      <select 
        value={formData.status} 
        onChange={(e) => setFormData({...formData, status: e.target.value})}
      >
        <option value="Plan to Watch">Plan to Watch</option>
        <option value="Watching">Watching</option>
        <option value="Completed">Completed</option>
      </select>

      <input 
        type="number" 
        min="1" max="10" 
        value={formData.rating} 
        onChange={(e) => setFormData({...formData, rating: e.target.value})} 
        required 
      />

      <input 
        type="text" 
        placeholder="Comment..." 
        value={formData.comment} 
        onChange={(e) => setFormData({...formData, comment: e.target.value})}
      />

      <input 
        type="text" 
        placeholder="Playlist (e.g., Animated Laughs)" 
        value={formData.playlistName} 
        onChange={(e) => setFormData({...formData, playlistName: e.target.value})} 
        required 
      />

      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovieForm;