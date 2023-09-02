const { combineReducers } = require('@reduxjs/toolkit');
const { contactReducer } = require('./contactSlice');

const rootReducer = combineReducers({
  contacts: contactReducer,
});

export default rootReducer;
