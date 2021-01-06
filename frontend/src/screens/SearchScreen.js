import React, { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { teachersGetStudentData } from '../actions/teacherActions';
import { LinkContainer } from 'react-router-bootstrap';

// A screen for the teachers and admin to find student reports
const SearchScreen = () => {
  const dispatch = useDispatch();
  // Fields for the form
  const [intake, setIntake] = useState('');
  const [name, setName] = useState('');

  // Application state - Teacher search results
  const teacherData = useSelector((state) => state.teacherData);
  const { teacherStudentData, loading, error } = teacherData;

  const submitHandler = (e) => {
    //   Call find student teacher action
    e.preventDefault();
    dispatch(teachersGetStudentData(intake, name));
  };

  useEffect(() => {
    //   Re-render when students are found
  });

  console.log('tsd', teacherStudentData && teacherStudentData.length);

  return (
    <>
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
      <br></br>
      <br></br>
      <br></br>
      {/* Results produced upon submission of the form */}
      <h2>Results</h2>
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>LATEST REPORT</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <div>loading</div>
          ) : teacherStudentData ? (
            teacherStudentData.map((student) => {
              const reportDate = new Date(student.updatedAt);
              return (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    {reportDate.getDate()}/{reportDate.getMonth() + 1}/
                    {reportDate.getFullYear()}
                  </td>
                  {console.log(student)}
                  <td>
                    <LinkContainer to={`/student/${student._id}`}>
                      <Button variant='light' className='btn-sm'>
                        Read Report
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              );
            })
          ) : error ? (
            <div>{error}</div>
          ) : teacherStudentData && teacherStudentData.length === 0 ? (
            <div>No entries found</div>
          ) : (
            <div>Please make a search</div>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default SearchScreen;
