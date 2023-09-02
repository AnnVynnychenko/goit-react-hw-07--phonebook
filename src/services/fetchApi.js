const BASE_URL = 'https://64f39022edfa0459f6c6ac94.mockapi.io/api/hw7';

export const fetchContacts = async () => {
  const response = await fetch(`${BASE_URL}/contacts`);
  return await response.json();
};

export const addContact = async contact => {
  const response = await fetch(`${BASE_URL}/contacts`, {
    body: JSON.stringify(contact),
  });
  return await response.json();
};

export const deleteContact = async id => {
  const response = await fetch(`${BASE_URL}/contacts/${id}`);
  return await response.json();
};
