import {
  TEACHER_REQUEST,
  TEACHER_SUCCESS,
  TEACHER_FAIL,
} from '../constants/teacherConstants';

export const teacherReducer = (state = {}, action) => {
  switch (action.type) {
    case TEACHER_REQUEST:
      console.log('TEACHER request');
      return { loading: true };
    case TEACHER_SUCCESS:
      console.log('TEACHER success');
      return { loading: false, teacherStudentData: action.payload };
    case TEACHER_FAIL:
      console.log('TEACHER fail');
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
