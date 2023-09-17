import React from 'react';
import GenreBadge from './GenreBadge/GenreBadge';

const MovieInfo = ({ description, genres }) => {
    return (
        <div>
            {description && <p>{description}</p>}
            {genres && genres.length > 0 && (
                <div>
                    {genres.map((genre) => (
                        <GenreBadge key={genre.id} genre={genre.name} genreId={genre.id} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MovieInfo;
