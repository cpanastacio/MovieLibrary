import React from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Badge, Button } from 'react-bootstrap';
import Rating from '../Rating/Rating';
import Posts from '../Posts/Posts';

const MovieDetails = () => {
  const { movie } = {
    movie: useLocation().state.movie,
  };
  const types = movie.genre.split(',');
  return (
    <>
      <Row
        className='row d-flex justify-content-center'
        style={{
          marginTop: '3rem',
        }}
      >
        <Col>
          <h1>{movie.title}</h1>
          <h6>
            {movie.type} {movie.year}
          </h6>
          <img src={movie.poster} />
          <Col style={{ marginTop: '1rem' }}>
            {types &&
              types.map((type, i) => {
                return (
                  <Badge
                    style={{ marginRight: '1rem' }}
                    key={i}
                    pill
                    bg='primary'
                  >
                    {type}
                  </Badge>
                );
              })}
          </Col>
        </Col>
        <Col>
          <Col
            className='row d-flex justify-content-center'
            style={{ width: '50rem', marginTop: '5rem', marginLeft: '-15rem' }}
          >
            <h2>Rating: {movie.rating}/10</h2>
            <Rating rate={parseFloat(movie.rating)} />
            {movie.plot}
            Writer: {movie.writer}
            Actors: {movie.actors}
            <Button>Add to watchlist</Button>
          </Col>
        </Col>
        <Row>
          <Posts title={movie.title} />
        </Row>
      </Row>
    </>
  );
};

export default MovieDetails;
