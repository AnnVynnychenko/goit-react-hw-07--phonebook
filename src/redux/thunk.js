import { createAsyncThunk } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from 'services/fetchApi';

export const fetchContactsThunk = createAsyncThunk(
  'contacts/fetch',
  async () => {
    const contacts = await fetchContacts();
    return contacts;
  }
);

export const addContactThunk = createAsyncThunk('contact/add', contact =>
  addContact(contact)
);

export const deleteContactThunk = createAsyncThunk('contact/delete', id =>
  deleteContact(id)
);
