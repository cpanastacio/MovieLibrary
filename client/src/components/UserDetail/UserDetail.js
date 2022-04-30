import React, { useContext, useState, useEffect } from 'react';
import { Tab, Tabs, Row } from 'react-bootstrap';
import { UserContext } from '../../Hooks/userContext';
import { getMoviesWithArray } from '../../API';
import UserCard from '../UserCard/UserCard';
import MovieCard from '../MovieCard/MovieCard';

function UserDetail() {
  const [key, setKey] = useState('movies');
  const [movies, setMovies] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    return () => {
      const fetchData = async () => {
        try {
          const response = await getMoviesWithArray(user.watchlist);
          console.log(response);
          return setMovies(response);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    };
  }, []);

  return (
    <>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
      >
        <Tabs
          id='controlled-tab-example'
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className='mb-3'
        >
          <Tab eventKey='movies' title='Titles Watched'></Tab>

          <Tab eventKey='profile' title='Profile'></Tab>
        </Tabs>
      </div>

      {key === 'profile' && (
        <div>
          <UserCard />
        </div>
      )}

      {key === 'movies' && (
        <Row className='row d-flex justify-content-center'>
          {movies &&
            movies.map((movie, id) => {
              return <MovieCard key={id} movie={movie} />;
            })}
        </Row>
      )}
    </>
  );
}

export default UserDetail;
