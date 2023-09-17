import { configureStore } from '@reduxjs/toolkit';
import genresReducer from './genresSlice';
import moviesReducer from './moviesSlice';
import movieDetailsReducer from './movieDetailsSlice';
import searchResultsReducer from './searchResultsSlice';

const store = configureStore({
    reducer: {
        movieDetails: movieDetailsReducer,
        genres: genresReducer,
        movies: moviesReducer,
        searchResults: searchResultsReducer,
    },
});

export default store;
