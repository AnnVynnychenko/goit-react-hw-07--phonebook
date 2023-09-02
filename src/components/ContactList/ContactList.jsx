import './ContactList.css';
import { getContactsValue, getFilterValue } from 'redux/contactSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteContactThunk, fetchContactsThunk } from 'redux/thunk';

const ContactList = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector(getContactsValue);
  // const filter = useSelector(getFilterValue);

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  // const normalizedFilter = filter.toLowerCase();
  // const visibleContacts = items.filter(
  //   contact =>
  //     contact.name && contact.name.toLowerCase().includes(normalizedFilter)
  // );
  const onDeleteContact = id => {
    dispatch(deleteContactThunk(id));
  };
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {items && (
        <ul className="contactList">
          {items.map(({ id, name, number }) => {
            return (
              <li key={id} className="contactItem">
                {name}:<span className="telNumber">{number}</span>
                <button
                  className="deleteContact"
                  type="button"
                  onClick={() => onDeleteContact(id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {error && <p>{error}</p>}
    </>
  );
};

export default ContactList;
