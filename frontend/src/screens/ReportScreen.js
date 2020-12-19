import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReportData } from '../actions/studentActions';

const ReportScreen = ({ history, match }) => {
  // Logged in user
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Individual Student
  const reportData = useSelector((state) => state.reportData);
  const { loading, student } = reportData;

  console.log(match.params.id);
  console.log(history);
  console.log('student', student);

  // Params passed by the URL
  const userId = match.params.id;

  const dispatch = useDispatch();

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
            <div>Effort</div>
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
