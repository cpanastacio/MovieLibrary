import React from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

function MovieTable({ movie }) {
  return (
    <>
      <Col style={{ maxWidth: '200px' }}>
        <img
          src={movie.poster}
          style={{ maxHeight: '200px', maxWidth: '130px' }}
        />
      </Col>
      <Col style={{ maxWidth: '900px', textAlign: 'left', marginTop: '1rem' }}>
        <h5>{movie.title}</h5>
        <h6>{movie.year}</h6>
        <h6>{movie.rating}</h6>
        {movie.actors}
        {movie.plot}
      </Col>
    </>
  );
}

MovieTable.propTypes = {
  movie: PropTypes.object,
};

export default MovieTable;
