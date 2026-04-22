import React from 'react';

const WatchlistStats = ({ movies }) => {
  const totalCount = movies.length;
  
  const averageRating = totalCount > 0 
    ? (movies.reduce((sum, item) => sum + item.rating, 0) / totalCount).toFixed(1)
    : 0;

  return (
    <div className="stats-container">
      <p>Total Movies: <strong>{totalCount}</strong></p>
      <p>Average Rating: <strong>{averageRating} / 10</strong></p>
    </div>
  );
};

export default WatchlistStats;