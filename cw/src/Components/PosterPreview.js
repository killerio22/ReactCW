import React from 'react';

const PosterPreview = ({ posterPath }) => {
    const BASE_URL = 'https://image.tmdb.org/t/p/w500';

    return <img src={BASE_URL + posterPath} alt="Movie Poster" />;
};

export default PosterPreview;
