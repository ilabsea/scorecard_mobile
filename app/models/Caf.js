import realm from '../db/schema';

const Caf = (() => {
  return {
    create,
    findByNgoId
  };

  function create(data, callback) {
    realm.write(() => {
      realm.create('Caf', data, 'modified');
      callback();
    });
  }

  function findByNgoId(ngoId) {
    return realm.objects('Caf').filtered(`local_ngo_id == ${ngoId}`)
  }
})();

export default Caf;