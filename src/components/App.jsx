import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Phonebook from './Phonebook';
import Contacts from './Contacts';

function App() {
  return (
    <Phonebook titleBegin="Phone" titleEnd="book">
      <ContactForm />
      <Contacts title="Contacts">
        <Filter />
        <ContactList />
      </Contacts>
    </Phonebook>
  );
}

export default App;
