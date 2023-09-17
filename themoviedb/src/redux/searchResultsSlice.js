import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    results: [],
};

const searchResultsSlice = createSlice({
    name: 'searchResults',
    initialState,
    reducers: {
        updateSearchResults: (state, action) => {
            state.results = action.payload;
        },
    },
});

export const { updateSearchResults } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;