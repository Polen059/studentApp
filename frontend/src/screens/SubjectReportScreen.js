import React from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';

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

  const grades = subjects.filter((subject) => {
    if (subject.subjectName === match.params.subject) {
      return subject;
    }
  });

  const [gradesObj] = grades;

  console.log(gradesObj);

  const subjectLabels = [];
  const subjectGrades = [];

  gradesObj.data.forEach((report) => {
    const reportDate = new Date(report.date);
    const graphDate = `${reportDate.getDate()}/${
      reportDate.getMonth() + 1
    }/${reportDate.getFullYear()}`;
    subjectGrades.push(report.subjectGrade);
    subjectLabels.push(graphDate);
  });

  return (
    <div>
      <h2>{match.params.subject} Report</h2>
      <p>A report about a single subject</p>
      <Line
        data={{
          labels: subjectLabels,
          datasets: [
            {
              label: 'Current Grade',
              data: subjectGrades,
              borderColor: '#ff0000',
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
