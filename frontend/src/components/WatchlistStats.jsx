import React from 'react';

const WatchlistStats = ({ movies }) => {
  const totalCount = movies.length;
  
  const averageRating = totalCount > 0 
    ? (movies.reduce((sum, item) => sum + item.rating, 0) / totalCount).toFixed(1)
    : 0;

  return (
    <div style={{ background: '#f4f4f4', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <p>Total Movies: <strong>{totalCount}</strong></p>
        <p>Average Rating: <strong>{averageRating} / 10</strong></p>
      </div>
    </div>
  );
};

export default WatchlistStats;