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
import ModalForm from '../ModalForm/ModalForm';

const Header = () => {
  const [movie, setMovie] = useState('');
  const [modalShowR, setModalShowR] = useState(false);
  const [modalShowL, setModalShowL] = useState(false);

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
            <NavDropdown title={'XWIFE3'} id='collasible-nav-dropdown'>
              <NavDropdown.Item>
                <h6 onClick={() => setModalShowR(true)}>Register</h6>
                <ModalForm
                  show={modalShowR}
                  onHide={() => setModalShowR(false)}
                  header={'Create new account'}
                  isRegister={true}
                />
              </NavDropdown.Item>
              <NavDropdown.Item>
                <h6 onClick={() => setModalShowL(true)}>Login</h6>
                <ModalForm
                  show={modalShowL}
                  onHide={() => setModalShowL(false)}
                  header={'Login'}
                  isRegister={false}
                />
              </NavDropdown.Item>
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
