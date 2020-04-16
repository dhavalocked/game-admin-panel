import { combineReducers } from '@reduxjs/toolkit';

import gamesReducer from './slices/gamesSlice';
import usersReducer from './slices/usersSlice';

const appReducer = combineReducers({
  gamesData: gamesReducer,
  usersData: usersReducer
});

export default combineReducers({ rummy: appReducer });