import { createSlice } from '@reduxjs/toolkit';
// // import { initialState } from './initialState';
import { addContact, deleteContact, fetchContacts } from 'services/fetchApi';

// const STATUS = {
//   PENDING: 'pending',
//   FULFILLED: 'fulfilled',
//   REJECTED: 'rejected',
// };

// const arrOfThunks = [addContact, deleteContact, fetchContacts];

// const thunksHandler = type => {
//   return arrOfThunks.map(thunk => thunk[type]);
// };

// const handlePending = state => {
//   state.isLoading = true;
// };

// const handleFulfilled = state => {
//   state.isLoading = false;
//   state.error = '';
// };

// const handleFulfilledFetch = (state, { payload }) => {
//   state.contacts = payload;
// };

// const handleFulfilledAdd = (state, { payload }) => {
//   state.contacts.push(payload);
// };

// const handleFulfilledDel = (state, { payload }) => {
//   state.contacts = state.contacts.filter(contact => contact.id !== payload.id);
// };

// const handleRejected = (state, { payload }) => {
//   state.isLoading = false;
//   state.error = payload;
// };

// export const contactSlice = createSlice({
//   name: 'contacts',
//   initialState: {
//     contacts: {
//       items: [],
//       isLoading: false,
//       error: '',
//     },
//     filter: '',
//   },
//   reducers: {
//     contactsFiltered(state, action) {
//       state.filter = action.payload;
//     },
//   },
//   extraReducers: builder => {
//     const { PENDING, FULFILLED, REJECTED } = STATUS;
//     builder
//       .addCase(fetchContacts.fulfilled, handleFulfilledFetch)
//       .addCase(addContact.fulfilled, handleFulfilledAdd)
//       .addCase(deleteContact.fulfilled, handleFulfilledDel)
//       .addMatcher(isAnyOf(...thunksHandler(PENDING)), handlePending)
//       .addMatcher(isAnyOf(...thunksHandler(FULFILLED)), handleFulfilled)
//       .addMatcher(isAnyOf(...thunksHandler(REJECTED)), handleRejected);
//   },
// });

// export const contactReducer = contactSlice.reducer;
// export const getContactsValue = state => state.contacts.contacts;
// export const getFilterValue = state => state.contacts.filter;
// export const { contactsFiltered } = contactSlice.actions;

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
      console.log('state.items', state.items);
      console.log('action.payload', action.payload);
    },
    [fetchContacts.rejected]: handleRejected,
    [addContact.pending]: handlePending,
    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [addContact.rejected]: handleRejected,
    [deleteContact.pending]: handlePending,
    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    [deleteContact.rejected]: handleRejected,
  },
});

export const contactReducer = contactSlice.reducer;
