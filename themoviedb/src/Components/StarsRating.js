import React from 'react';
import StarRatings from 'react-star-ratings';

const StarsRating = ({ rating }) => {
    return (
        <StarRatings
            rating={rating}
            starRatedColor="#FF0000"
            numberOfStars={10}
            name="rating"
            starDimension="30px"
            starSpacing="0.2vw"
        />
    );
};

export default StarsRating;
