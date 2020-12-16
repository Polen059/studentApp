import {
  PARENT_REQUEST,
  PARENT_SUCCESS,
  PARENT_FAIL,
} from '../constants/parentConstants';

export const parentReducer = (state = {}, action) => {
  switch (action.type) {
    case PARENT_REQUEST:
      console.log('Parent request');
      return { loading: true };
    case PARENT_SUCCESS:
      console.log('Parent success');
      return { loading: false, studentData: action.payload };
    case PARENT_FAIL:
      console.log('Parent fail');
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
