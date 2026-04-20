import React, { useState } from 'react';
import axios from 'axios';

const AddMovieForm = ({ onMovieAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    rating: 5,
    streamingPlatform: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/watchlist', formData);
      onMovieAdded(); // Refresh the list
      setFormData({ title: '', director: '', rating: 5, streamingPlatform: '' });
    } catch (err) {
      alert("Error adding movie. Check if backend is running!");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px 0', padding: '15px', border: '1px solid #fa75e0' }}>
      <h3>Add to Watchlist</h3>
      <input type="text" placeholder="Movie Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
      <input type="text" placeholder="Director" value={formData.director} onChange={(e) => setFormData({...formData, director: e.target.value})} required />
      <input type="number" min="1" max="10" value={formData.rating} onChange={(e) => setFormData({...formData, rating: e.target.value})} required />
      <input type="text" placeholder="Platform (e.g. Netflix)" value={formData.streamingPlatform} onChange={(e) => setFormData({...formData, streamingPlatform: e.target.value})} required />
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovieForm;