import React, { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { teachersGetStudentData } from '../actions/teacherActions';

// A screen for the teachers and admin to find student reports
const SearchScreen = () => {
  const dispatch = useDispatch();
  // Fields for the form
  const [intake, setIntake] = useState('');
  const [name, setName] = useState('');

  const submitHandler = (e) => {
    //   Call find student teacher action
    e.preventDefault();
    dispatch(teachersGetStudentData(intake, name));
  };

  useEffect(() => {
    //   Re-render when students are found
  });

  return (
    <FormContainer>
      <h1>Find Student</h1>
      {/* {error && <Message variant='danger'>{error}</Message>} */}
      {/* {loading && <Loader />} */}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='intake'>
          <Form.Label>Intake</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter intake year'
            value={intake}
            onChange={(e) => setIntake(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Type Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Find
        </Button>
      </Form>
    </FormContainer>
  );
};

export default SearchScreen;
