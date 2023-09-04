import './ContactList.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteContact, fetchContacts } from 'services/fetchApi';
import { getContacts } from 'redux/selectors';

const ContactList = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector(getContacts);
  console.log('error', error);
  console.log('items', items);
  console.log('isLoading', isLoading);

  // const filter = useSelector(getFilterValue);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // const normalizedFilter = filter.toLowerCase();
  // const visibleContacts = items.filter(
  //   contact =>
  //     contact.name && contact.name.toLowerCase().includes(normalizedFilter)
  // );
  const onDeleteContact = id => {
    dispatch(deleteContact(id));
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
