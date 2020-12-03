import axios from 'axios';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
  console.log('login action attempt', email, password);
  try {
    console.log('login action attempt try');
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    console.log('2');
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log('3');

    const { data } = await axios.post(
      '/api/users/login',
      {
        email,
        password,
      },
      config
    );
    console.log('4', data);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    console.log('login action fail');
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};
