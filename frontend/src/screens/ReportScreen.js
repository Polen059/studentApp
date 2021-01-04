import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReportData } from '../actions/studentActions';
import AverageEffort from '../components/studentData/AverageEffort';

const ReportScreen = ({ history, match }) => {
  // Logged in user
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Individual Student
  const reduxReportData = useSelector((state) => state.reportData);
  // Destructure student and their report data, with a default if empty
  const { loading, student, student: { reportData } = {} } = reduxReportData;

  // console.log(match.params.id);
  // console.log(history);
  // console.log('student', student);
  // console.log('reportData', reportData);

  // Params passed by the URL
  const userId = match.params.id;

  const dispatch = useDispatch();

  // initialise ordered reports
  let reportsOrderedByDate;
  let avgEffort;

  // Student exists and has loaded
  if (student) {
    // Sort the array of reports, newest first
    reportsOrderedByDate = reportData.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Find average effort of the reports
    // Returns an array of numbers representing a reports average effort
    avgEffort = reportsOrderedByDate
      .map((report) =>
        report.data.map((subject) => {
          return subject.effort;
        })
      )
      .map(
        (report) =>
          report.reduce((total, effort) => total + effort) / report.length
      );
  }

  // If user is logged in get report data, else send to login page
  useEffect(() => {
    if (userId) {
      dispatch(getReportData(userId));
    } else {
      history.push('/login');
    }
  }, [userId, history, dispatch]);

  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : student ? (
        <>
          <h1>{student.name}'s Latest Report</h1>
          <div>
            {/* The effort Circle - Props are an array of effort scores */}
            {student && <AverageEffort averageEffortArray={avgEffort} />}
            <div>Reports</div>
            <div>Subjects</div>
          </div>
        </>
      ) : (
        <div>Not found</div>
      )}
    </>
  );
};

export default ReportScreen;
