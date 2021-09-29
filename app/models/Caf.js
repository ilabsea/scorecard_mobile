import realm from '../db/schema';

const Caf = (() => {
  return {
    create,
    findByLngoId,
    findById,
    deleteByLngoId,
  };

  function create(data, callback) {
    realm.write(() => {
      realm.create('Caf', data, 'modified');
      callback();
    });
  }

  function findByLngoId(lngoId) {
    return realm.objects('Caf').filtered(`local_ngo_id == ${lngoId}`)
  }

  function findById(id) {
    return realm.objects('Caf').filtered(`id = ${id}`)[0];
  }

  function deleteByLngoId(lngoId) {
    const cafs = findByLngoId(lngoId);

    realm.write(() => {
      realm.delete(cafs);
    });
  }
})();

export default Caf;