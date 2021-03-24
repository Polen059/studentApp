import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import Message from '../components/Message'
// import Loader from '../components/Loader'
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

// This is the login screen for all users split into two halves staff & students / parents
// Staff/Students use Google Oauth
//  Parents use username password
// Logged in users details are stored in a cookie on the backend
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
    <Tabs defaultActiveKey='students/staff' id='login' className='mb-3'>
      <Tab eventKey='students/staff' title='students/staff'>
        {/* Button for Google users to use */}
        <div>
          <p>
            Friesand staff and students should click on this button to log in
            with their frieslandschool.com accounts.
          </p>
          <p>
            Once you click the button you will be taken to a screen to log in
            with this account. If you are logged in with any other Google
            account, then the login will fail.
          </p>
          <button
            className='btn btn-primary'
            onClick={async () => {
              console.log('google');
              // Change for production
              await window.open(
                'http://localhost:5000/api/users/google',
                '_self'
              );
            }}
          >
            Google Login
          </button>
        </div>
      </Tab>
      <Tab eventKey='parents/guardians' title='parents/guardians'>
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
        </FormContainer>
      </Tab>
    </Tabs>
  );
};

export default LoginScreen;
