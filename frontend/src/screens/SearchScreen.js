import React, { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button, Row, Col, Table, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { teachersGetStudentData } from '../actions/teacherActions';
import { LinkContainer } from 'react-router-bootstrap';

// A screen for the teachers and admin to find student reports
const SearchScreen = ({ history }) => {
  const dispatch = useDispatch();
  // Fields for the form
  const [intake, setIntake] = useState('');
  const [name, setName] = useState('');

  // Application state - Teacher search results
  const teacherData = useSelector((state) => state.teacherData);
  const { teacherStudentData, loading, error } = teacherData;

  // Redux user data
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = (e) => {
    //   Call find student teacher action
    e.preventDefault();
    dispatch(teachersGetStudentData(intake, name));
    error && setSearchError(true);
  };

  useEffect(() => {
    // If not logged in, or student/parent send to the home page
    // Currently dealt with in the header component
  }, []);

  // Keep track of search error
  const [searchError, setSearchError] = useState(false);

  // If error, display alert for 2 secs
  useEffect(() => {
    if (!teacherStudentData && error) {
      console.log('error');
      setSearchError(true);
      setTimeout(() => {
        setSearchError(false);
      }, 2000);
    }
  }, [error]);

  return (
    <>
      <Row className='mb-3'>
        <h1>Teacher Dashboard</h1>
      </Row>
      <Row className='mb-5'>
        <FormContainer>
          <h2>Find Student</h2>
          {searchError && !teacherStudentData && !loading && (
            <Alert variant='danger'>{error}</Alert>
          )}
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
            {userInfo && userInfo.role === 'admin' ? (
              <Button type='submit' variant='primary'>
                Search
              </Button>
            ) : (
              <Button type='submit' variant='primary' disabled>
                Search
              </Button>
            )}
          </Form>
        </FormContainer>
      </Row>
      {/* Results produced upon submission of the form */}
      <Row>
        <h2>Results</h2>
      </Row>
      <Row>
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
                    <td>
                      <LinkContainer to={`/student/${student._id}`}>
                        <Button color='primary' className='btn-sm primary'>
                          Read Report
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                );
              })
            ) : // : error ? (
            //   <Alert variant='danger'>{error}</Alert>
            // )
            teacherStudentData && teacherStudentData.length === 0 ? (
              <Alert variant='info'>No entries found</Alert>
            ) : (
              <div>Please make a search</div>
            )}
          </tbody>
        </Table>
      </Row>
    </>
  );
};

export default SearchScreen;
