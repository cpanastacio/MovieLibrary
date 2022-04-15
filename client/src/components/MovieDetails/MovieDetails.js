import React from "react";
import { useLocation } from "react-router-dom";
import { Row, Col, Badge } from "react-bootstrap";
import Rating from "../Rating/Rating";

const MovieDetails = () => {
    const { movie } = {
        movie: useLocation().state.movie,
    };
    console.log(movie);
    const types = movie.genre.split(",");
    return (
        <Row style={{ height: "100vh", marginTop: "2rem" }}>
            <Col style={{ marginLeft: "17rem" }}>
                <h1>{movie.title}</h1>
                <h6>
                    {movie.type} {movie.year}
                </h6>
                <img src={movie.poster} />
                <Col style={{ marginTop: "1rem" }}>
                    {types.map((type, i) => {
                        return (
                            <Badge style={{ marginRight: "1rem" }} key={i} pill bg="primary">
                                {type}
                            </Badge>
                        );
                    })}
                </Col>
            </Col>
            <Col>
                <Col style={{ width: "50rem", marginTop: "1rem", marginLeft: "-15rem" }}>
                    <h2>Rating: {movie.rating}/10</h2>
                    <Rating maxRate={10} rate={parseFloat(movie.rating)} />
                    <p></p>
                    {movie.plot}
                    <p></p>
                    Writer: {movie.writer}
                    <p></p>
                    Actors: {movie.actors}
                </Col>
            </Col>
        </Row>
    );
};

export default MovieDetails;
