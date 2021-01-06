import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Col, Row, Card } from 'react-bootstrap';

const SingleReportScreen = ({ history, match }) => {
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

  const report = ordered.filter((report) => {
    if (report.updatedAt === match.params.reportId) {
      return report;
    }
  });

  const [reportObj] = report;
  console.log(reportObj);
  const reportDate = new Date(reportObj.updatedAt);
  return (
    <div>
      <h2>
        Single Report ({reportDate.getDate()}/{reportDate.getMonth() + 1}/
        {reportDate.getFullYear()})
      </h2>
      {reportObj.data.map((subject) => {
        return (
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{subject.subjectName}</Card.Title>
              <Card.Text>Current Grade: {subject.subjectGrade}</Card.Text>
              <Card.Text>Effort: {subject.effort}/5</Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default SingleReportScreen;
