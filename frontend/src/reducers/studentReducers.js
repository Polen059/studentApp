import {
  STUDENT_REQUEST,
  STUDENT_SUCCESS,
  STUDENT_FAIL,
} from '../constants/studentConstants';
import { orderedReports, avgEffort, subjectSorter } from '../utils/sorters';

export const studentReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_REQUEST:
      console.log('STUDENT request');
      return { loading: true };
    case STUDENT_SUCCESS:
      console.log('STUDENT success');
      console.log(action.payload);
      const o = orderedReports(action.payload.reportData);
      const a = avgEffort(o);
      const s = subjectSorter(o);
      return {
        loading: false,
        student: action.payload,
        ordered: o,
        average: a,
        subjects: s,
      };
    case STUDENT_FAIL:
      console.log('STUDENT fail');
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
