import axios from 'axios';
import {
  PARENT_REQUEST,
  PARENT_SUCCESS,
  PARENT_FAIL,
} from '../constants/parentConstants';

export const getStudentData = () => async (dispatch) => {
  console.log('getStudentData for Parents');
  try {
    // Needed???????????????? Seems to work without
    // dispatch({
    //   type: PARENT_REQUEST,
    // });
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // };

    const { data } = await axios.get('/api/parents', { crossdomain: true });

    dispatch({
      type: PARENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log('Parent fail');
    dispatch({
      type: PARENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
