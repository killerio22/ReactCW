import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        list: [],
        page: 1,
        totalPages: 0,
        selectedGenre: null,
    },
    reducers: {
        setMovies: (state, action) => {
            state.list = action.payload.results;
            state.totalPages = action.payload.total_pages;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setSelectedGenre: (state, action) => {
            state.selectedGenre = action.payload;
        },
    },
});

export const { setMovies, setPage, setSelectedGenre } = moviesSlice.actions;
export const selectMovies = (state) => state.movies;
export default moviesSlice.reducer;
