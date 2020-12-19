import axios from 'axios';
import {
  STUDENT_REQUEST,
  STUDENT_SUCCESS,
  STUDENT_FAIL,
} from '../constants/studentConstants';

export const getReportData = (_id) => async (dispatch) => {
  console.log('getStudentData for All', _id);
  try {
    // Needed???????????????? Seems to work without
    dispatch({
      type: STUDENT_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/students',
      {
        _id,
      },
      config,
      { crossdomain: true }
    );

    dispatch({
      type: STUDENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log('Student fail');
    dispatch({
      type: STUDENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
