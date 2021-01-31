import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReportData } from '../actions/studentActions';
import AverageEffort from '../components/studentData/AverageEffort';
import ReportsList from '../components/studentData/ReportsList';
import styled from 'styled-components';
import SubjectList from '../components/studentData/SubjectList';
import { Container, Col, Row } from 'react-bootstrap';
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

  // initialise ordered reports
  // let reportsOrderedByDate;
  // let avgEffort;
  // let subjectReports = [];

  // // Student exists and has loaded
  // if (student) {
  //   // Sort the array of reports, newest first
  //   reportsOrderedByDate = reportData.sort((a, b) => {
  //     return new Date(b.createdAt) - new Date(a.createdAt);
  //   });

  //   // Find average effort of the reports
  //   // Returns an array of numbers representing a reports average effort
  //   avgEffort = reportsOrderedByDate
  //     .map((report) =>
  //       report.data.map((subject) => {
  //         return subject.effort;
  //       })
  //     )
  //     .map(
  //       (report) =>
  //         report.reduce((total, effort) => total + effort) / report.length
  //     );

  //   //   Sort the sorted data by subject rather than by report date
  //   reportsOrderedByDate.forEach((report) => {
  //     console.log(report);
  //     report.data.forEach((subject) => {
  //       console.log(subject);
  //       // If the subject name appears in the subjectreports array
  //       if (
  //         !subjectReports.some((o) => o.subjectName === subject.subjectName)
  //       ) {
  //         // Add a new object
  //         let obj = { subjectName: subject.subjectName, data: [] };
  //         subjectReports.push(obj);
  //         subject.date = report.createdAt;
  //         obj.data.push(subject);
  //       } else {
  //         subjectReports.forEach((subjectArr) => {
  //           if (subjectArr.subjectName === subject.subjectName) {
  //             subject.date = report.createdAt;
  //             subjectArr.data.push(subject);
  //           }
  //         });
  //       }
  //     });
  //   });
  //   console.log(subjectReports);
  // }

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
          <h1 style={{ marginBottom: '30px' }}>
            {student.name}'s Latest Report
          </h1>
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
