import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { register, login } from '../../API';

const Formu = ({ isRegister, onHide }) => {
  if (isRegister) {
    const [newUser, setNewUser] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    const handleAddFormChange = (event) => {
      event.preventDefault();

      const fieldName = event.target.getAttribute('name');
      const fieldValue = event.target.value;

      const newFormData = { ...newUser };
      newFormData[fieldName] = fieldValue;

      setNewUser(newFormData);
    };

    const handleAddFormSubmit = (event) => {
      event.preventDefault();

      const userObj = {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        confirmPassword: newUser.confirmPassword,
      };
      setNewUser(userObj);

      const registerUser = async () => {
        try {
          const response = await register(newUser);
          alert(response.message);
          setNewUser({});
          onHide(); //closes the modal
        } catch (error) {
          alert(error);

          console.error(error);
        }
      };
      registerUser();
    };

    return (
      <Form>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='username'
            name='username'
            placeholder='Enter Username'
            onChange={handleAddFormChange}
          />
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Enter email'
            onChange={handleAddFormChange}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            placeholder='Password'
            onChange={handleAddFormChange}
          />
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type='password'
            name='confirmPassword'
            placeholder='Password'
            onChange={handleAddFormChange}
          />
        </Form.Group>
        <Button
          variant='primary'
          data-bs-dismiss='modal'
          onClick={handleAddFormSubmit}
        >
          Create new account
        </Button>
      </Form>
    );
  } else {
    const [loginUser, setLoginUser] = useState({
      username: '',
      password: '',
    });

    const handleAddFormChange = (event) => {
      event.preventDefault();

      const fieldName = event.target.getAttribute('name');
      const fieldValue = event.target.value;

      const newFormData = { ...loginUser };
      newFormData[fieldName] = fieldValue;

      setLoginUser(newFormData);
    };

    const handleAddFormSubmit = (event) => {
      event.preventDefault();

      const userObj = {
        username: loginUser.username,
        password: loginUser.password,
      };
      setLoginUser(userObj);

      const registerUser = async () => {
        try {
          const response = await login(userObj.username, userObj.password);
          console.log(response);
          setLoginUser({});
          onHide(); //closes the modal
        } catch (error) {
          alert(error);

          console.error(error);
        }
      };
      registerUser();
    };
    return (
      <Form>
        <Form.Group className='mb-3' controlId='formBasicEmailLogin'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='username'
            name='username'
            placeholder='Enter Username'
            onChange={handleAddFormChange}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPasswordLogin'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            onChange={handleAddFormChange}
          />
        </Form.Group>
        <Button
          variant='primary'
          data-bs-dismiss='modal'
          onClick={handleAddFormSubmit}
        >
          Create new account
        </Button>
      </Form>
    );
  }
};

Formu.propTypes = {
  isRegister: PropTypes.bool,
  onHide: PropTypes.func,
};

export default Formu;
