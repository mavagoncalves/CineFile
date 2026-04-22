import React from 'react';

const PlaylistTabs = ({ playlists, activePlaylist, onSelect }) => {
  return (
    <div className="playlist-tabs-container">
      <button 
        className={`playlist-tab ${activePlaylist === 'All' ? 'active' : ''}`}
        onClick={() => onSelect('All')}
      >
        All Movies
      </button>
      
      {playlists.map(listName => (
        <button 
          key={listName}
          className={`playlist-tab ${activePlaylist === listName ? 'active' : ''}`}
          onClick={() => onSelect(listName)}
        >
          {listName}
        </button>
      ))}
    </div>
  );
};

export default PlaylistTabs;