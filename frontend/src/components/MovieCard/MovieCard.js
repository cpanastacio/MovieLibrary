import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

const MovieCard = ({ movie }) => {
    return (
        <Card style={{ width: "18rem", marginTop: "3rem" }}>
            <Card.Img variant="top" src={movie.poster} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>Rating: {movie.rating}</Card.Text>
                <Card.Text>
                    {movie.type} {movie.year}
                </Card.Text>
                <Button variant="primary">Details</Button>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.object,
};

export default MovieCard;
