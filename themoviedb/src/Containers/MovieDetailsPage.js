import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails, selectMovieDetails } from '../redux/movieDetailsSlice';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './MovieDetailsPage.css';
import StarsRating from '../Components/StarsRating';
import GenreBadge from '../Components/GenreBadge/GenreBadge';

const MovieDetailsPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const { movieDetails } = useSelector(selectMovieDetails);

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        dispatch(fetchMovieDetails(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (movieDetails && movieDetails.genres) {
            const genreNames = movieDetails.genres.map(genre => genre.name);
            setGenres(genreNames);
        }
    }, [movieDetails]);

    const handleNextMovie = () => {
        const nextId = parseInt(id, 10) + 1;
        navigate(`/movies/${nextId}`);
    };

    const handlePreviousMovie = () => {
        const previousId = parseInt(id, 10) - 1;
        navigate(`/movies/${previousId}`);
    };

    return (
        <div className="MovieDetails">
            {movieDetails && (
                <>
                    <h1>{movieDetails.title}</h1>
                    {movieDetails.poster_path && (
                        <img
                            src={`https://image.tmdb.org/t/p/w300/${movieDetails.poster_path}`}
                            alt={movieDetails.title}
                            className="movie-poster"
                        />
                    )}
                    <br/>
                    <StarsRating rating={movieDetails.vote_average} />
                    <p>Опис: {movieDetails.overview}</p>
                    <div className="Genres">
                        <p>Жанри:</p>
                            {genres.length > 0 ? (
                                genres.map((genreName, index) => (
                                    <GenreBadge key={index} genre={genreName} />
                                ))
                            ) : (
                                <p>Жанри не знайдено</p>
                            )}
                    </div>
                    <p>Оригінальна мова: {movieDetails.original_language}</p>
                    <p>Дата виходу: {movieDetails.release_date}</p>
                    {movieDetails.backdrop_path && (
                        <img
                            src={`https://image.tmdb.org/t/p/w300/${movieDetails.backdrop_path}`}
                            alt={movieDetails.title}
                            className="movie-poster"
                        />
                    )}
                    <br/>
                    <br/>
                    <div className="navigate">
                        <button onClick={handlePreviousMovie} className="Navigate">
                            Попередній
                        </button>
                        <Link to="/" className="main">
                            <button className="Navigate">Повернутися до всіх фільмів</button>
                        </Link>
                        <button onClick={handleNextMovie} className="Navigate">
                            Наступний
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default MovieDetailsPage;
