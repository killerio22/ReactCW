import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MoviesPage.css';
import GenresList from '../GenresList/GenresList';
import blueLongImage from 'D:/Курси_Okten/React_hw/cw/src/blue_long_2.svg';

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedGenre, setSelectedGenre] = useState(null);

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
            setMovies(response.data.results);
            setTotalPages(response.data.total_pages);
        } catch (error) {
            console.error('Error fetching movies:', error);
            setMovies([]);
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
            setMovies(response.data.results);
            setTotalPages(response.data.total_pages);
        } catch (error) {
            console.error('Error fetching movies by genre:', error);
            setMovies([]);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handleGenreSelect = (genreId) => {
        setSelectedGenre(genreId);
        setPage(1);
    };

    return (
        <div>
            <img src={blueLongImage} className="TMDb"/>
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
