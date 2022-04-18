import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

const Formu = ({ isRegister }) => {
  if (isRegister) {
    return (
      <Form>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Username</Form.Label>
          <Form.Control type='username' placeholder='Enter Username' />
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' />
          <Form.Label>Confirm password</Form.Label>
          <Form.Control type='password' placeholder='Password' />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Create new account
        </Button>
      </Form>
    );
  } else
    return (
      <Form>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Username</Form.Label>
          <Form.Control type='username' placeholder='Enter Username' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' />
        </Form.Group>
      </Form>
    );
};

Formu.propTypes = {
  isRegister: PropTypes.bool,
};

export default Formu;
