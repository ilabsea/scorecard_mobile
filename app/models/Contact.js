import realm from '../db/schema';

const Contact =  (() => {
  return {
    getAll,
    findByProgram,
    create,
    deleteAll,
  }

  function getAll() {
    return realm.objects('Contact');
  }

  function findByProgram(programId) {
    return realm.objects('Contact').filtered(`program_id = ${programId}`);
  }

  function create(data) {
    realm.write(() => {
      realm.create('Contact', data, 'modified');
    });
  }

  function deleteAll() {
    const contacts = getAll();

    if (contacts.length > 0)
      realm.write(() => {
        realm.delete(contacts);
      });
  }
})();

export default Contact;