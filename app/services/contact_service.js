import ContactApi from '../api/ContactApi';
import Contact from '../models/Contact';

const contactService = (() => {
  return {
    getAll,
    downloadContacts,
  }

  function getAll() {
    const contacts = JSON.parse(JSON.stringify(Contact.getAll()));
    return contacts.sort((a, b) => (a.contact_type < b.contact_type) ? 1 : ((b.contact_type < a.contact_type) ? -1 : 0));
  }

  function downloadContacts(callback, errorCallback) {
    new ContactApi().load((contacts) => {
      Contact.deleteAll();
      contacts.map((contact) => {
        Contact.create(contact);
      });

      !!callback && callback();
    }, (error) => !!errorCallback && errorCallback())
  }
})();

export default contactService;
