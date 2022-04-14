import React from "react";
import { useLocation } from "react-router-dom";
import { Row, Col, Badge } from "react-bootstrap";

const MovieDetails = () => {
    const { movie } = {
        movie: useLocation().state.movie,
    };
    const types = movie.genre.split(",");
    return (
        <Row style={{ height: "100vh" }}>
            <Col style={{ maxWidth: "25rem", margin: "auto", marginTop: "3rem" }}>
                <h1>{movie.title}</h1>
                <h6>
                    {movie.type} {movie.year}
                </h6>
                <img src={movie.poster} />
                <p></p>
                {types.map((type, i) => {
                    return (
                        <Badge style={{ marginRight: "1rem" }} key={i} pill bg="primary">
                            {type}
                        </Badge>
                    );
                })}
                <p></p>
                {movie.plot}
            </Col>
        </Row>
    );
};

export default MovieDetails;
