import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './MovieDetailsPage.css';

const MovieDetailsPage = () => {
    const [movieDetails, setMovieDetails] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getMovieDetailsFromApi();
    }, [id]);

    const getMovieDetailsFromApi = async () => {
        try {
            const API_KEY = '3fd18b952bcfccfcbf93020ec9c38570';
            const API_URL = 'https://api.themoviedb.org/3';
            const response = await axios.get(`${API_URL}/movie/${id}`, {
                params: {
                    api_key: API_KEY,
                },
            });

            const movie = response.data;
            setMovieDetails(movie);
        } catch (error) {
            console.error('Error fetching movie details:', error);
            setMovieDetails({});
        }
    };

    const isValidMovie = async (movieId) => {
        try {
            const API_KEY = '3fd18b952bcfccfcbf93020ec9c38570';
            const API_URL = 'https://api.themoviedb.org/3';
            const response = await axios.get(`${API_URL}/movie/${movieId}`, {
                params: {
                    api_key: API_KEY,
                },
            });

            const movie = response.data;
            if (
                movie.popularity &&
                movie.poster_path &&
                movie.title &&
                movie.vote_average &&
                movie.original_language &&
                movie.backdrop_path
            ) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error fetching movie details:', error);
            return false;
        }
    };

    const handleNextMovie = async () => {
        let nextId = parseInt(id, 10) + 1;
        while (!(await isValidMovie(nextId))) {
            nextId++;
        }
        navigate(`/movies/${nextId}`);
    };

    const handlePreviousMovie = async () => {
        let previousId = parseInt(id, 10) - 1;
        while (!(await isValidMovie(previousId))) {
            previousId--;
        }
        navigate(`/movies/${previousId}`);
    };

    return (
        <div className="MovieDetails">
            {movieDetails.poster_path &&
            movieDetails.backdrop_path ? (
                <>
                    <h1>{movieDetails.title}</h1>
                    <img
                        src={`https://image.tmdb.org/t/p/w300/${
                            movieDetails.poster_path || movieDetails.backdrop_path
                        }`}
                        alt={movieDetails.title}
                        style={{ width: '300px' }}
                    />
                    <p>Оригінальна мова: {movieDetails.original_language}</p>
                    <p>Оригінальна назва: {movieDetails.original_title}</p>
                    <p>Опис: {movieDetails.overview}</p>
                    <p>Популярність: {movieDetails.popularity}</p>
                    <p>Дата виходу: {movieDetails.release_date}</p>
                    <p>Рейтинг: {movieDetails.vote_average}</p>

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
            ) : (
                <p>Фільм недоступний або має неповну інформацію.</p>
            )}
        </div>
    );
};

export default MovieDetailsPage;
