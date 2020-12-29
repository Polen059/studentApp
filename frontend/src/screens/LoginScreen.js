import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import Message from '../components/Message'
// import Loader from '../components/Loader'
import { login, checkSession } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

const LoginScreen = ({ location, history }) => {
  // Fields for the form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  // Redux user data
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    // When logged in send to the right page... TODO
    if (userInfo) {
      if (userInfo.role === 'parent') {
        history.push('/parent');
      } else if (userInfo.role === 'student') {
        history.push(`/report/${userInfo._id}`);
      } else if (userInfo.role === 'admin') {
        // Add Admin user route on frontend
        history.push('/findstudent');
      } else if (userInfo.role === 'teacher') {
        history.push('/findstudent');
      } else {
        history.push('/login');
      }
    }
  }, [history, userInfo]);

  // Send username and password to the login action (parents)
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {/* {error && <Message variant='danger'>{error}</Message>} */}
      {/* {loading && <Loader />} */}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>

      {/* Button for Google users to use */}
      <button
        className='btn btn-primary'
        onClick={async () => {
          console.log('google');
          await window.open('http://localhost:5000/api/users/google', '_self');
          // dispatch(checkSession());
        }}
      >
        Google Login
      </button>
    </FormContainer>
  );
};

export default LoginScreen;
