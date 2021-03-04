import React from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Col, Row, Card, Button } from 'react-bootstrap';

const SubjectReportScreen = ({ history, match }) => {
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

  // Filter out the subject
  const grades = subjects.filter((subject) => {
    if (subject.subjectName === match.params.subject) {
      return subject;
    }
  });

  const [gradesObj] = grades;

  console.log(gradesObj);

  // Empty arrays for the graph datasets
  const subjectLabels = [];
  const subjectGrades = [];
  const subjectEffort = [];

  // Take subject object and move data to the arrays aove
  gradesObj.data.forEach((report) => {
    const reportDate = new Date(report.date);
    const graphDate = `${reportDate.getDate()}/${
      reportDate.getMonth() + 1
    }/${reportDate.getFullYear()}`;
    subjectGrades.push(report.subjectGrade);
    subjectLabels.push(graphDate);
    subjectEffort.push(report.effort);
  });

  return (
    <div>
      <Row>
        <h2>{match.params.subject} Report</h2>
      </Row>
      <Row>
        <p>A report about a single subject</p>
      </Row>
      <Row>
        <Button
          className='mb-3'
          size='sm'
          onClick={() => {
            history.goBack();
          }}
        >
          Back to the report
        </Button>
      </Row>
      <Line
        data={{
          labels: subjectLabels,
          datasets: [
            {
              label: 'Current Grade',
              data: subjectGrades,
              borderColor: '#ff0000',
            },
            {
              label: 'Effort',
              data: subjectEffort,
              borderColor: '#00ff00',
            },
          ],
        }}
        options={{
          title: { display: true, text: match.params.subject },
          legend: {
            display: true,
            position: 'bottom',
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default SubjectReportScreen;
