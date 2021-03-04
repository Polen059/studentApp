import React, { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentData } from '../actions/parentActions';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row } from 'react-bootstrap';

const ParentDashboard = ({ match, history }) => {
  // Redux user data
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Contains info about a parents kids
  const parentData = useSelector((state) => state.parentData);
  const { studentData, loading } = parentData;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo && userInfo.role === 'parent' && !studentData) {
      dispatch(getStudentData());
    } else if (!userInfo || userInfo.role !== 'parent') {
      history.push('/login');
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <Row className='mb-3'>
        <h1>Parent Dashboard</h1>
      </Row>
      {loading ? (
        <div>Loading</div>
      ) : studentData ? (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>NAME</th>
              {/* <th>EMAIL</th> */}
              <th>LATEST REPORT</th>
              <th>READ</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((student) => {
              const reportDate = new Date(student.updatedAt);
              return (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  {/* <td>{student.email}</td> */}
                  <td>
                    {reportDate.getDate()}/{reportDate.getMonth() + 1}/
                    {reportDate.getFullYear()}
                  </td>
                  {console.log(student)}
                  <td>
                    <LinkContainer to={`/student/${student._id}`}>
                      <Button className='btn-sm'>Read Report</Button>
                    </LinkContainer>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <div>error</div>
      )}
    </>
  );
};

export default ParentDashboard;
