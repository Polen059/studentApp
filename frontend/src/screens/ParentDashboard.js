import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentData } from '../actions/parentActions';

const ParentDashboard = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const parentData = useSelector((state) => state.parentData);
  const { studentData } = parentData;

  const dispatch = useDispatch();

  useEffect(() => {
    // if (!userInfo) {
    //   //   history.push('/login');
    //   console.log('no user info');
    // }
    dispatch(getStudentData());
  }, []);

  return (
    <div>
      <h1>Parent Page</h1>
      {/* {studentData.map((student) => (
        <p key={student._id}>{student.email}</p>
      ))} */}
    </div>
  );
};

export default ParentDashboard;
