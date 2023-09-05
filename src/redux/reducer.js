import { filterReducer } from './filterSlice';

const { combineReducers } = require('@reduxjs/toolkit');
const { contactReducer } = require('./contactSlice');

const rootReducer = combineReducers({
  contacts: contactReducer,
  filters: filterReducer,
});

export default rootReducer;
