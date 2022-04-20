import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { register, login } from '../../API';

const Formu = ({ isRegister, onHide }) => {
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  //Handles the input data that comes from the form
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    let newFormData = {};
    newFormData = { ...newUser };
    newFormData[fieldName] = fieldValue;
    setNewUser(newFormData);
  };

  //Handles the submit allowing the user register or login
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const userObj = {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      confirmPassword: newUser.confirmPassword,
    };
    setNewUser(userObj);

    const registerOrLogin = async () => {
      try {
        if (isRegister) {
          const response = await register(newUser);
          alert(response.message);
        } else {
          const response = await login(userObj.username, userObj.password);
          alert(`Welcome ${response.username}`);
          localStorage.setItem('user', JSON.stringify(response));
        }
        setNewUser({});
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
          type='username'
          name='username'
          placeholder='Enter Username'
          onChange={handleAddFormChange}
        />
        {isRegister ? (
          <>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='Enter email'
              onChange={handleAddFormChange}
            />
          </>
        ) : null}
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleAddFormChange}
        />
        {isRegister ? (
          <>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type='password'
              name='confirmPassword'
              placeholder='Password'
              onChange={handleAddFormChange}
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
};

export default Formu;
