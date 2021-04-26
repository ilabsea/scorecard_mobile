import realm from '../db/schema';

const ProgramLanguage = (() => {
  return {
    create,
    getAll,
    isExist,
  };

  function create(attrs) {
    realm.write(() => {
      realm.create('ProgramLanguage', attrs);
    });
  }

  function getAll(programId) {
    return realm.objects('ProgramLanguage').filtered(`program_id = ${programId}`);
  }

  function isExist(programId) {
    return realm.objects('ProgramLanguage').filtered(`program_id = ${programId}`)[0] != undefined;
  }
})();

export default ProgramLanguage;