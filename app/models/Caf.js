import realm from '../db/schema';

const Caf = (() => {
  return {
    findByNgoId
  };

  function findByNgoId(ngoId) {
    return realm.objects('Caf').filtered(`local_ngo_id == ${ngoId}`)
  }
})();

export default Caf;