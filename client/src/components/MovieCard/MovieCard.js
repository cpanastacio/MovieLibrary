import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const onClick = (movie) => {
    const newTitle = movie.title.replaceAll(' ', '+');
    navigate(`/tv=${newTitle}`, { state: { movie: movie } });
  };
  return (
    <Card
      onClick={() => onClick(movie)}
      style={{
        width: '18rem',
        marginTop: '3rem',
        height: '43rem',
        marginBottom: '1rem',
        cursor: 'pointer',
      }}
    >
      <Card.Img variant='top' src={movie.poster} style={{ height: '24em' }} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>Rating: {movie.rating}</Card.Text>
        <Card.Text>
          {movie.type} {movie.year}
        </Card.Text>
        <Card.Text>{movie.plot}</Card.Text>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object,
};

export default MovieCard;
