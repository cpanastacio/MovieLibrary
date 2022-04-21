import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Navbar,
  NavDropdown,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import { getMovieIfNotExistsAddsDB } from '../../API';
import ModalForm from '../ModalForm/ModalForm';

const Header = () => {
  const navigate = useNavigate();

  const handleUserProfile = () => {
    navigate(`/user`);
  };

  const [movie, setMovie] = useState('');
  const [modalShowR, setModalShowR] = useState(false);
  const [modalShowL, setModalShowL] = useState(false);

  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user') || null;
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  });

  const handleOnChange = (e) => {
    setMovie(e.target.value);
  };
  const fetchRequest = async () => {
    try {
      const result = await getMovieIfNotExistsAddsDB(movie);
      return setMovie(result);
    } catch (error) {
      console.error(error);
    } finally {
      setMovie('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload(true);
  };

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='/'>Movies Library</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            {/* <Nav.Link href='/'>Home</Nav.Link> */}
            <Form className='d-flex'>
              <FormControl
                value={movie}
                type='search'
                placeholder='Search'
                className='me-2'
                aria-label='Search'
                onChange={handleOnChange}
              />
              <Button onClick={fetchRequest} variant='outline-success'>
                Search
              </Button>
            </Form>
          </Nav>
          <Nav>
            <NavDropdown
              title={user ? user.username : 'User'}
              id='collasible-nav-dropdown'
            >
              {user == null ? (
                <NavDropdown.Item>
                  <h6 onClick={() => setModalShowR(true)}>Register</h6>
                  <ModalForm
                    show={modalShowR}
                    onHide={() => setModalShowR(false)}
                    header={'Create new account'}
                    isRegister={true}
                  />
                </NavDropdown.Item>
              ) : null}

              {user == null ? (
                <NavDropdown.Item>
                  <h6 onClick={() => setModalShowL(true)}>Login</h6>
                  <ModalForm
                    show={modalShowL}
                    onHide={() => setModalShowL(false)}
                    header={'Login'}
                    isRegister={false}
                  />
                </NavDropdown.Item>
              ) : null}
              {user != null ? (
                <NavDropdown.Item onClick={handleUserProfile}>
                  User profile
                </NavDropdown.Item>
              ) : null}
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
