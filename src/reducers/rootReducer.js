// rootReducer.js
import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import movieReducer from './movieReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  movies: movieReducer,
});

export default rootReducer;
