import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer } from './reducers/userReducers';
import { parentReducer } from './reducers/parentReducers';
import { studentReducer } from './reducers/studentReducers';
import { teacherReducer } from './reducers/teacherReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  parentData: parentReducer,
  reportData: studentReducer,
  teacherData: teacherReducer,
});

// Checklocal storage, could cookie be checked here?
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// Set redux initial state to userinfo from local storage if it exists
const initialState = { userLogin: { userInfo: userInfoFromStorage } };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
