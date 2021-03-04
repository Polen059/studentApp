import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Col, Row, Card, Button } from 'react-bootstrap';

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
      <Row>
        <h2>
          Single Report ({reportDate.getDate()}/{reportDate.getMonth() + 1}/
          {reportDate.getFullYear()})
        </h2>
      </Row>
      <Row className='mb-3'>
        <Button
          size='sm'
          onClick={() => {
            history.goBack();
          }}
        >
          Back to the report
        </Button>
      </Row>
      <Row>
        {reportObj.data.map((subject) => {
          return (
            <Col md={4}>
              <Card className='mb-3'>
                <Card.Body>
                  <Card.Title>{subject.subjectName}</Card.Title>
                  <Card.Text>Current Grade: {subject.subjectGrade}</Card.Text>
                  <Card.Text>Effort: {subject.effort}/5</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default SingleReportScreen;
