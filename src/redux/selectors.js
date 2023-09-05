import { createSelector } from '@reduxjs/toolkit';

export const getContacts = state => state.contacts.contacts.items;
export const getIsLoading = state => state.contacts.contacts.isLoading;
export const getError = state => state.contacts.contacts.error;
export const getFilterValue = state => state.contacts.filters.filter;

export const selectVisibleContacts = createSelector(
  [getContacts, getFilterValue],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(
      contact =>
        contact.name && contact.name.toLowerCase().includes(normalizedFilter)
    );
    return visibleContacts;
  }
);
