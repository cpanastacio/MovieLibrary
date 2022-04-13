import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { getMovies } from "../../API";
import { Col, Row } from "react-bootstrap";

const CardWrapper = () => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await getMovies();
                return setMovies(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMovies();
    }, []);

    return (
        <Row>
            {movies.map((m, i) => {
                return (
                    <Col key={m + i}>
                        <MovieCard key={i} movie={m} />
                    </Col>
                );
            })}
        </Row>
    );
};

export default CardWrapper;
