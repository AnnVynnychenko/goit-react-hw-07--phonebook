import { useDispatch, useSelector } from 'react-redux';
import './Filter.css';
import { contactsFiltered, getFilterValue } from 'redux/contactSlice';

const Filter = () => {
  const filter = useSelector(getFilterValue);
  const dispatch = useDispatch();
  const filterContacts = e => {
    const { value } = e.currentTarget;
    dispatch(contactsFiltered(value));
  };
  return (
    <label className="contactLabel">
      <span className="textForm">Find contacts by name</span>
      <input
        className="contactInput filterInput"
        type="text"
        value={filter}
        onChange={filterContacts}
        required
      />
    </label>
  );
};

export default Filter;
