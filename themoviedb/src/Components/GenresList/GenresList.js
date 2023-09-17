import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setGenres } from '../../redux/genresSlice';
import './GenresList.css';
import axios from "axios";

const GenresList = ({ onGenreSelect }) => {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);

    useEffect(() => {
        const getGenresFromApi = async () => {
            try {
                const API_KEY = '3fd18b952bcfccfcbf93020ec9c38570';
                const API_URL = 'https://api.themoviedb.org/3';
                const response = await axios.get(`${API_URL}/genre/movie/list`, {
                    params: {
                        api_key: API_KEY,
                    },
                });
                dispatch(setGenres(response.data.genres));
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        getGenresFromApi();
    }, [dispatch]);

    return (
        <div className="genres-list">
            <div className="genres-list-container">
                {genres.map((genre) => (
                    <Link
                        key={genre.id}
                        to={`/genres/${genre.id}`}
                        className="genre-item"
                        onClick={() => onGenreSelect(genre.id)}
                    >
                        {genre.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default GenresList;
