import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, Link } from 'react-router-dom';
import './GenresList.css'

const GenresList = ({ onGenreSelect }) => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        getGenresFromApi();
    }, []);

    const getGenresFromApi = async () => {
        try {
            const API_KEY = '3fd18b952bcfccfcbf93020ec9c38570';
            const API_URL = 'https://api.themoviedb.org/3';
            const response = await axios.get(`${API_URL}/genre/movie/list`, {
                params: {
                    api_key: API_KEY,
                },
            });
            setGenres(response.data.genres);
        } catch (error) {
            console.error('Error fetching genres:', error);
            setGenres([]);
        }
    };

    return (
        <div className="genres-list">
            <NavLink to="/genres" activeClassName="active-link">
            </NavLink>
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