import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { register, login } from '../../API';
import { useForm } from '../../Hooks/useForm';

const Formu = ({ isRegister, onHide, setUser }) => {
  const [values, handleChange] = useForm({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  //Handles the submit allowing the user register or login
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const userObj = {
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    const registerOrLogin = async () => {
      try {
        if (isRegister) {
          const response = await register(userObj);
          alert(response.message);
        } else {
          const response = await login(userObj.username, userObj.password);
          alert(`Welcome ${response.username}`);
          setUser(response);
          localStorage.setItem('loggedIn', true);
          window.location.reload();
        }
        onHide(); //closes the modal
      } catch (error) {
        console.error(error);
      }
    };
    registerOrLogin();
  };

  return (
    <Form>
      <Form.Group className='mb-3'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          name='username'
          value={values.username}
          placeholder='Enter Username'
          onChange={handleChange}
        />
        {isRegister ? (
          <>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name='email'
              value={values.email}
              placeholder='Enter email'
              onChange={handleChange}
            />
          </>
        ) : null}
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          name='password'
          value={values.password}
          placeholder='Enter password'
          onChange={handleChange}
        />
        {isRegister ? (
          <>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type='password'
              name='confirmPassword'
              value={values.confirmPasswords}
              placeholder='Confirm password'
              onChange={handleChange}
            />
          </>
        ) : null}
      </Form.Group>
      <Button
        variant='primary'
        data-bs-dismiss='modal'
        onClick={handleAddFormSubmit}
      >
        {isRegister ? 'Create new account' : 'Login'}
      </Button>
    </Form>
  );
};

Formu.propTypes = {
  isRegister: PropTypes.bool,
  onHide: PropTypes.func,
  setUser: PropTypes.func,
};

export default Formu;
