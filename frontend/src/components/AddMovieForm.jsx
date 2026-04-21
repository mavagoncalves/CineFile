import React, { useState } from 'react';
import axios from 'axios';

const AddMovieForm = ({ onMovieAdded }) => {
  const [formData, setFormData] = useState({
    movie: '', // This needs to be an ObjectID from your Movie collection
    rating: 5,
    comment: '',
    status: 'Plan to Watch'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // IMPORTANT: You must include a 'user' ID here for the backend to accept it
      const payload = {
        ...formData,
        user: "PASTE_YOUR_USER_ID_HERE" // Put the ID you got from /api/users
      };

      await axios.post('http://localhost:5000/api/watchlist', payload);
      onMovieAdded(); 
      setFormData({ movie: '', rating: 5, comment: '', status: 'Plan to Watch' });
    } catch (err) {
      console.error(err);
      alert("Validation Error: Make sure you are using a valid Movie ID!");
    }
  };

  return (
    <form className="add-movie-form" onSubmit={handleSubmit}>
      <h3 style={{ gridColumn: '1 / -1' }}>Add to CineFile</h3>
      
      <input 
        type="text" 
        placeholder="Paste Movie ObjectID" 
        value={formData.movie} 
        onChange={(e) => setFormData({...formData, movie: e.target.value})} 
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

      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovieForm;