import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setMovies, setPage, setSelectedGenre } from '../../redux/moviesSlice';
import './MoviesPage.css';
import GenresList from '../GenresList/GenresList';
import blueLongImage from '../../blue_long_2.svg';
import axios from "axios";
import { selectMovies } from '../../redux/moviesSlice';

const MoviesPage = () => {
    const dispatch = useDispatch();
    const { list: movies, page, totalPages, selectedGenre } = useSelector(selectMovies);

    useEffect(() => {
        if (selectedGenre) {
            getMoviesByGenreFromApi();
        } else {
            getMoviesFromApi();
        }
    }, [page, selectedGenre]);

    const getMoviesFromApi = async () => {
        try {
            const API_KEY = '3fd18b952bcfccfcbf93020ec9c38570';
            const API_URL = 'https://api.themoviedb.org/3';
            const response = await axios.get(`${API_URL}/discover/movie`, {
                params: {
                    api_key: API_KEY,
                    page: page,
                },
            });
            dispatch(setMovies(response.data));
        } catch (error) {
            console.error('Error fetching movies:', error);
            dispatch(setMovies({ results: [], total_pages: 0 }));
        }
    };

    const getMoviesByGenreFromApi = async () => {
        try {
            const API_KEY = '3fd18b952bcfccfcbf93020ec9c38570';
            const API_URL = 'https://api.themoviedb.org/3';
            const response = await axios.get(`${API_URL}/discover/movie`, {
                params: {
                    api_key: API_KEY,
                    page: page,
                    with_genres: selectedGenre,
                },
            });
            dispatch(setMovies(response.data));
        } catch (error) {
            console.error('Error fetching movies by genre:', error);
            dispatch(setMovies({ results: [], total_pages: 0 }));
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            dispatch(setPage(page - 1));
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            dispatch(setPage(page + 1));
        }
    };

    const handleGenreSelect = (genreId) => {
        dispatch(setSelectedGenre(genreId));
        dispatch(setPage(1));
    };

    return (
        <div>
            <img src={blueLongImage} className="TMDb" />
            <GenresList onGenreSelect={handleGenreSelect} />
            <div className="movies-list">
                {movies.map((movie) => (
                    <Link key={movie.id} to={`/movies/${movie.id}`} className="movie-item">
                        <img
                            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                            alt={movie.title}
                            className="movie-image"
                        />
                        <h2 className="movie-title">{movie.title}</h2>
                    </Link>
                ))}
            </div>

            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={page === 1}>
                    Previous
                </button>
                <span className="page-number">Page {page}</span>
                <button onClick={handleNextPage} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default MoviesPage;
