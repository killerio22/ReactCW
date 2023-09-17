import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MoviesList from '../Components/MoviesList';
import './MoviesByGenrePage.css';

const MoviesByGenrePage = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [genreMovies, setGenreMovies] = useState([]);
    const { genreId } = useParams();

    const getMoviesByGenreFromApi = useCallback(async () => {
        try {
            const API_KEY = '3fd18b952bcfccfcbf93020ec9c38570';
            const API_URL = 'https://api.themoviedb.org/3';
            const response = await axios.get(`${API_URL}/discover/movie`, {
                params: {
                    api_key: API_KEY,
                    page: page,
                    with_genres: genreId,
                },
            });
            setMovies(response.data.results);
            setTotalPages(response.data.total_pages);
            setGenreMovies(response.data.results);
        } catch (error) {
            console.error('Error fetching movies by genre:', error);
            setMovies([]);
            setGenreMovies([]);
        }
    }, [genreId, page]);

    useEffect(() => {
        getMoviesByGenreFromApi();
    }, [getMoviesByGenreFromApi]);

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

    return (
        <div className="films">
            <h1>Фільми за жанром</h1>
            <MoviesList movies={genreMovies} />
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={page === 1}>
                    Попередній
                </button>
                <span className="page-number">Сторінка {page}</span>
                <button onClick={handleNextPage} disabled={page === totalPages}>
                    Наступний
                </button>
            </div>
        </div>
    );
};

export default MoviesByGenrePage;
