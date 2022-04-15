import React, { useState } from 'react';
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

const Header = () => {
  const [movie, setMovie] = useState('');

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

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='#home'>Movies Library</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/'>Home</Nav.Link>
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
            <NavDropdown title='User' id='collasible-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>
                User profile
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.1'>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
