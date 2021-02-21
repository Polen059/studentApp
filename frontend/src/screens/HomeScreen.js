import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const HomeScreen = () => {
  return (
    <>
      <Jumbotron>
        <h1 className='display-3'>Welcome to Friesland!</h1>
        <p className='lead'>
          Here you wil find all the assessment data about you, your children or
          your students
        </p>
        <hr className='my-2' />
        <p>Please login to access all that lovely information</p>
        <p className='lead'>
          <LinkContainer to='/login'>
            <Button color='primary'>Login</Button>
          </LinkContainer>
        </p>
      </Jumbotron>
    </>
  );
};

export default HomeScreen;
