import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css';

import Header from './components/Header/Header';
import CardWrapper from './components/CardWrapper/CardWrapper';
import MovieDetails from './components/MovieDetails/MovieDetails';
import UserDetail from './components/UserDetail/UserDetail';

function App() {
  const userIsLoggedIn = localStorage.getItem('loggedIn');
  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes>
          <Route
            path='/'
            element={
              <Container>
                <CardWrapper />
              </Container>
            }
          ></Route>
          <Route path={`/tv:title`} element={<MovieDetails />}></Route>
          {userIsLoggedIn ? (
            <Route path={`/user`} element={<UserDetail />}></Route>
          ) : null}
          <Route path={`*`} element={<h1>404. Page not found!</h1>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
