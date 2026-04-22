import React from 'react';

const GenreFilter = ({ currentGenre, onGenreChange, genres }) => {
  return (
    <div className="filter-container">
      <label htmlFor="genre-select">Filter by Genre:</label>
      <select 
        id="genre-select"
        value={currentGenre} 
        onChange={(e) => onGenreChange(e.target.value)}
      >
        <option value="All">All Genres</option>
        {genres.map(genre => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;