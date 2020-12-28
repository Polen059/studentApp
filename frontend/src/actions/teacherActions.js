import axios from 'axios';
import {
  TEACHER_REQUEST,
  TEACHER_SUCCESS,
  TEACHER_FAIL,
} from '../constants/teacherConstants';

export const teachersGetStudentData = (intake, name) => async (dispatch) => {
  try {
    dispatch({
      type: TEACHER_REQUEST,
    });

    // Request headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Pass in params from the action call
    const { data } = await axios.get(
      '/api/teachers/searchStudents',
      { params: { intake, name } },
      config
    );

    dispatch({
      type: TEACHER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log('TEACHER fail');
    dispatch({
      type: TEACHER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
