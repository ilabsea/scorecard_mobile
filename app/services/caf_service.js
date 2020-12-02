import realm from '../db/schema';

const saveCaf = async (scorecardUUID, cafs, callback) => {
  cafs.map((caf) => {
    const cafSet = {
      id: caf.id,
      name: caf.name,
      local_ngo_id: caf['local_ngo_id'],
      scorecard_uuid: scorecardUUID,
    };
    realm.write(() => { realm.create('Caf', cafSet, 'modified'); });
  });
  callback(true);
};

export {saveCaf};