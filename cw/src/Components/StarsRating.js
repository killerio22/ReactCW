import React from 'react';
import StarRatings from 'react-star-ratings';

const StarsRating = ({ rating }) => {
    return (
        <StarRatings
            rating={rating}
            starRatedColor="gold"
            numberOfStars={10}
            name="rating"
            starDimension="20px"
            starSpacing="2px"
        />
    );
};

export default StarsRating;
