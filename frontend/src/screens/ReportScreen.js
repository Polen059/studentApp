import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReportData } from '../actions/studentActions';
import AverageEffort from '../components/studentData/AverageEffort';
import ReportsList from '../components/studentData/ReportsList';
import styled from 'styled-components';
import SubjectList from '../components/studentData/SubjectList';
import { Container, Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';

const ReportsSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const ReportScreen = ({ history, match }) => {
  // Logged in user
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Individual Student
  const reduxReportData = useSelector((state) => state.reportData);
  // Destructure student and their report data, with a default if empty
  const {
    loading,
    student,
    student: { reportData } = {},
    ordered,
    average,
    subjects,
  } = reduxReportData;

  // console.log(match.params.id);
  // console.log(history);
  // console.log('student', student);
  // console.log('reportData', reportData);

  // Params passed by the URL
  const userId = match.params.id;

  const dispatch = useDispatch();

  // If user is logged in get report data, else send to login page
  useEffect(() => {
    if (!student) {
      if (userId) {
        dispatch(getReportData(userId));
      } else {
        history.push('/login');
      }
    }
  }, [userId, history, dispatch]);

  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : student ? (
        <>
          <Row>
            <h1 style={{ marginBottom: '30px' }}>
              {student.name}'s Latest Report
            </h1>
          </Row>
          {userInfo && userInfo.role === 'admin' && (
            <Row className='mb-3'>
              <Button
                size='sm'
                onClick={() => {
                  history.go(-1);
                }}
              >
                Find new student
              </Button>
            </Row>
          )}
          {userInfo && userInfo.role === 'parent' && (
            <Row className='mb-3'>
              <Button
                size='sm'
                onClick={() => {
                  history.go(-1);
                }}
              >
                Back to dashboard
              </Button>
            </Row>
          )}
          <Row>
            {/* The effort Circle - Props are an array of effort scores */}
            {student && (
              <Col xs={12} sm={12} md={4}>
                <AverageEffort averageEffortArray={average} />
              </Col>
            )}
            {student && (
              <Col xs={12} sm={12} md={4}>
                <ReportsList reports={ordered} id={userId} />
              </Col>
            )}
            {student && (
              <Col xs={12} sm={12} md={4}>
                <SubjectList subjects={subjects} id={userId} />
              </Col>
            )}
          </Row>
        </>
      ) : (
        <div>Not found</div>
      )}
    </>
  );
};

export default ReportScreen;
