import './ContactList.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteContact, fetchContacts } from 'services/fetchApi';
import {
  getContacts,
  getError,
  getIsLoading,
  selectVisibleContacts,
} from 'redux/selectors';

const ContactList = () => {
  const dispatch = useDispatch();
  const items = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const visibleContacts = useSelector(selectVisibleContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {items && (
        <ul className="contactList">
          {visibleContacts.map(({ id, name, number }) => {
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
