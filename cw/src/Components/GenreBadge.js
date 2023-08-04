import React from 'react';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

const GenreBadge = ({ genre, genreId }) => {
    return (
        <Link to={`/genres/${genreId}`}>
            <Badge color="primary">{genre}</Badge>
        </Link>
    );
};

export default GenreBadge;
