// import { createSlice } from '@reduxjs/toolkit';
// import { nanoid } from 'nanoid';
// import { initialState } from './initialState';

// export const contactSlice = createSlice({
//   name: 'contacts',
//   initialState,
//   reducers: {
//     addContact: {
//       reducer: (state, action) => {
//         state.contacts.push(action.payload);
//       },
//       prepare: contactData => {
//         const id = nanoid();
//         return { payload: { ...contactData, id } };
//       },
//     },
// delContact(state, action) {
//   state.contacts = state.contacts.filter(
//     contact => contact.id !== action.payload
//   );
// },
// contactsFiltered(state, action) {
//   state.filter = action.payload;
// },
//   },
// });

// export const { addContact, delContact, contactsFiltered } =
//   contactSlice.actions;

// export const getContactsValue = state => state.contacts.contacts;
// export const getFilterValue = state => state.contacts.filter;

import { createSlice, isAnyOf } from '@reduxjs/toolkit';
// import { initialState } from './initialState';
import {
  addContactThunk,
  deleteContactThunk,
  fetchContactsThunk,
} from './thunk';

const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

const arrOfThunks = [addContactThunk, deleteContactThunk, fetchContactsThunk];

const thunksHandler = type => {
  return arrOfThunks.map(thunk => thunk[type]);
};

const handlePending = state => {
  state.isLoading = true;
};

const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};

const handleFulfilledFetch = (state, { payload }) => {
  state.contacts = payload;
};

const handleFulfilledAdd = (state, { payload }) => {
  state.contacts.push(payload);
};

const handleFulfilledDel = (state, { payload }) => {
  state.contacts = state.contacts.filter(contact => contact.id !== payload.id);
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      error: null,
    },
    filter: '',
  },
  reducers: {
    contactsFiltered(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    const { PENDING, FULFILLED, REJECTED } = STATUS;
    builder
      .addCase(fetchContactsThunk.fulfilled, handleFulfilledFetch)
      .addCase(addContactThunk.fulfilled, handleFulfilledAdd)
      .addCase(deleteContactThunk.fulfilled, handleFulfilledDel)
      .addMatcher(isAnyOf(...thunksHandler(PENDING)), handlePending)
      .addMatcher(isAnyOf(...thunksHandler(FULFILLED)), handleFulfilled)
      .addMatcher(isAnyOf(...thunksHandler(REJECTED)), handleRejected);
  },
});

export const contactReducer = contactSlice.reducer;
export const getContactsValue = state => state.contacts.contacts;
export const getFilterValue = state => state.contacts.filter;
export const { contactsFiltered } = contactSlice.actions;
