import React from 'react';
import './GenreBadge.css'; // Імпортуємо CSS для жанрів

const GenreBadge = ({ genre }) => {
    return (
        <span className="genre-badge">
      {genre}
    </span>
    );
};

export default GenreBadge;
