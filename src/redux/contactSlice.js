import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { initialStateContacts } from './state/initialStateContacts';
import { addContact, deleteContact, fetchContacts } from 'services/fetchApi';

const thunksArr = [fetchContacts, addContact, deleteContact];

const defaultStatus = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
};

const thunkHandler = status => {
  return thunksArr.map(el => el[status]);
};

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const handleIsLoadingAndErr = state => {
  state.isLoading = false;
  state.error = null;
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: initialStateContacts,
  extraReducers: builder => {
    const { pending, fulfilled, rejected } = defaultStatus;
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.items = state.items.filter(item => item.id !== payload.id);
      })
      .addMatcher(isAnyOf(...thunkHandler(pending)), handlePending)
      .addMatcher(isAnyOf(...thunkHandler(fulfilled)), state => {
        handleIsLoadingAndErr(state);
      })
      .addMatcher(isAnyOf(...thunkHandler(rejected)), handleRejected);
  },
});

export const contactReducer = contactSlice.reducer;
