import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMovieDetails = createAsyncThunk(
    'movieDetails/fetchMovieDetails',
    async (movieId, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=3fd18b952bcfccfcbf93020ec9c38570`);
            if (!response.ok) {
                throw new Error('Не вдалося отримати дані фільму');
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const movieDetailsSlice = createSlice({
    name: 'movieDetails',
    initialState: {
        movieDetails: null,
        loading: 'idle',
        error: null,
    },
    reducers: {
        setMovieDetails: (state, action) => {
            state.movieDetails = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieDetails.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.movieDetails = action.payload;
            })
            .addCase(fetchMovieDetails.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload;
            });
    },
});

export const selectMovieDetails = (state) => state.movieDetails;

export default movieDetailsSlice.reducer;
