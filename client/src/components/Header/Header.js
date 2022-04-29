import React, { useContext, useState } from 'react';
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
import { getMovieIfNotExistsAddsDB, logout } from '../../API';
import ModalForm from '../ModalForm/ModalForm';
import { UserContext } from '../../Hooks/userContext';

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleUserProfile = () => {
    navigate(`/user`);
  };

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

  const handleLogout = () => {
    const fetchRequest = async () => {
      try {
        const result = await logout();
        setUser('');
        localStorage.clear();
        navigate(`/`);
        return result.data;
      } catch (error) {
        console.error(error);
      }
    };
    fetchRequest();
  };

  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      bg='dark'
      variant='dark'
      style={{ position: 'sticky', top: 0 }}
    >
      <Container>
        <Navbar.Brand>
          <h1>Movies Library</h1>
        </Navbar.Brand>
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
            <NavDropdown
              title={Object.keys(user).length > 0 ? user.username : 'User'}
              id='collasible-nav-dropdown'
            >
              {Object.keys(user).length === 0 && (
                <>
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
                </>
              )}
              {Object.keys(user).length > 0 && (
                <>
                  <NavDropdown.Item onClick={handleUserProfile}>
                    User profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
