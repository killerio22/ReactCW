import React from 'react';
import PosterPreview from './PosterPreview';
import StarsRating from './StarsRating';
import MovieInfo from './MovieInfo';
import { Link } from 'react-router-dom';

const MoviesListCard = ({ movie }) => {
    return (
        <div>
            <Link to={`/movies/${movie.id}`}>
                <PosterPreview posterPath={movie.poster_path} />
            </Link>
                <h2>{movie.title}</h2>
                <StarsRating rating={movie.vote_average} />
                <MovieInfo description={movie.overview} genres={movie.genres} />

        </div>
    );
};

export default MoviesListCard;
