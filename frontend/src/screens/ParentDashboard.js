import React, { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentData } from '../actions/parentActions';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';

const ParentDashboard = ({ match, history }) => {
  // const history = useHistory();

  // Redux user data
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Contains info about a parents kids
  const parentData = useSelector((state) => state.parentData);
  const { studentData, loading } = parentData;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo && userInfo.role === 'parent') {
      dispatch(getStudentData());
      console.log(studentData);
    } else {
      console.log('no user info');
      history.push('/login');
    }
  }, [dispatch]);

  return (
    <>
      <h1>Parent Dashboard</h1>
      {loading ? (
        <div>Loading</div>
      ) : studentData ? (
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
            {studentData.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.updatedAt}</td>
                {console.log(student)}
                <td>
                  <LinkContainer to={`/report/${student._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Read Report
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>error</div>
      )}
    </>
  );
};

export default ParentDashboard;
