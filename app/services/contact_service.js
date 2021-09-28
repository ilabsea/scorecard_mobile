import ContactApi from '../api/ContactApi';
import Contact from '../models/Contact';

const contactService = (() => {
  const contactApi = new ContactApi();

  return {
    getAll,
    downloadContacts,
  }

  function getAll() {
    const contacts = JSON.parse(JSON.stringify(Contact.getAll()));
    return contacts.sort((a, b) => (a.contact_type < b.contact_type) ? 1 : ((b.contact_type < a.contact_type) ? -1 : 0));
  }

  function downloadContacts(callback) {
    contactApi.load().then(function (response) {
      if (response.status != 200) { return; }

      Contact.deleteAll();

      callback && callback();
    })
  }
})();

export default contactService;
