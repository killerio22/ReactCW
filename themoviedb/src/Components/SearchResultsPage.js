import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import MoviesList from '../Components/MoviesList';
import { updateSearchResults } from '../redux/searchResultsSlice';

const SearchResultsPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');
    const dispatch = useDispatch();
    const searchResults = useSelector((state) => state.searchResults.results);

    useEffect(() => {
        const API_KEY = '3fd18b952bcfccfcbf93020ec9c38570';
        const API_URL = 'https://api.themoviedb.org/3/search/movie';

        axios
            .get(API_URL, {
                params: {
                    api_key: API_KEY,
                    query: query,
                },
            })
            .then((response) => {
                dispatch(updateSearchResults(response.data.results));
            })
            .catch((error) => {
                console.error('Error fetching search results:', error);
                dispatch(updateSearchResults([]));
            });
    }, [dispatch, query]);

    return (
        <div>
            <h1>Результати пошуку за запитом: {query}</h1>
            <MoviesList movies={searchResults} />
        </div>
    );
};

export default SearchResultsPage;
