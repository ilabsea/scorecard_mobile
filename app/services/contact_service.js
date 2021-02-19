import realm from '../db/schema';
import ContactApi from '../api/ContactApi';

const contactService = (() => {
  const contactApi = new ContactApi();

  return {
    getAll,
    downloadContacts
  }

  function getAll() {
    return realm.objects('Contact');
  }

  function downloadContacts() {
    contactApi.load().then(function (response) {
      if (response.status != 200) { return; }

      let contacts = realm.objects('Contact');
      let data = response.data;

      realm.write(() => {
        realm.delete(contacts);

        for(let i=0; i<data.length; i++) {
          realm.create('Contact', data[i], 'modified');
        }
      })
    });
  }
})();

export default contactService;
