import React from 'react';
import MoviesListCard from './MoviesListCard';

const MoviesList = ({ movies }) => {
    return (
        <div>
            {movies.map((movie) => (
                <MoviesListCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MoviesList;
