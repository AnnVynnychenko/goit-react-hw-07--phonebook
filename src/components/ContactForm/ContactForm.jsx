import { useState } from 'react';
import './ContactForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'services/fetchApi';
import { getContacts } from 'redux/selectors';

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const { items } = useSelector(getContacts);
  const dispatch = useDispatch();

  const formSubmitHandler = e => {
    e.preventDefault();
    const ifNameTaken = items.some(
      item => item.name.toLowerCase() === name.toLowerCase()
    );
    if (ifNameTaken) {
      return alert(`${name} is already in contacts`);
    }
    dispatch(addContact({ name, number }));
    reset();
  };

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className="contactForm" onSubmit={formSubmitHandler}>
      <label>
        <span className="textForm">Name</span>
        <input
          className="contactInput"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        <span className="textForm">Number</span>
        <input
          className="contactInput"
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className="addContact">
        Add contact
      </button>
    </form>
  );
}

export default ContactForm;
