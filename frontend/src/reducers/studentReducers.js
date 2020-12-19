import {
  STUDENT_REQUEST,
  STUDENT_SUCCESS,
  STUDENT_FAIL,
} from '../constants/studentConstants';

export const studentReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_REQUEST:
      console.log('STUDENT request');
      return { loading: true };
    case STUDENT_SUCCESS:
      console.log('STUDENT success');
      return { loading: false, student: action.payload };
    case STUDENT_FAIL:
      console.log('STUDENT fail');
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
