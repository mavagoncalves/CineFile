import React from 'react';

const WatchlistTable = ({ movies, onDelete }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <h2>My Watchlist</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc' }}>
            <th style={{ textAlign: 'left' }}>Title</th>
            <th style={{ textAlign: 'left' }}>Rating</th>
            <th style={{ textAlign: 'left' }}>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.length === 0 ? (
            <tr><td colSpan="4">No movies in your CineFile yet.</td></tr>
          ) : (
            movies.map((item) => (
              <tr key={item._id} style={{ borderBottom: '1px solid #eee' }}>
                {/* We use item.movie?.title because of the .populate() in backend */}
                <td>{item.movie?.title || "Unknown Title"}</td>
                <td>{item.rating}/10</td>
                <td>{item.status}</td>
                <td>
                  <button 
                    onClick={() => onDelete(item._id)}
                    style={{ color: 'red', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WatchlistTable;