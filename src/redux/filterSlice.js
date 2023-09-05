import { createSlice } from '@reduxjs/toolkit';
import { initialStateFilter } from './state/initialStateFilter';

const filterSlice = createSlice({
  name: 'filters',
  initialState: initialStateFilter,
  reducers: {
    contactsFiltered(state, action) {
      state.filter = action.payload;
    },
  },
});

export const filterReducer = filterSlice.reducer;
export const { contactsFiltered } = filterSlice.actions;
