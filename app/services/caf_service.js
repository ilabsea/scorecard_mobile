import realm from '../db/schema';
import {getDownloadPercentage} from '../utils/scorecard_detail_util';

const saveCaf = async (scorecardUUID, cafs, updateDownloadPercentage, callback) => {
  let savedCount = 0;
  cafs.map((caf) => {
    const cafSet = {
      id: caf.id,
      name: caf.name,
      local_ngo_id: caf['local_ngo_id'],
    };
    realm.write(() => {
      realm.create('Caf', cafSet, 'modified');
      savedCount += 1;
    });
    updateDownloadPercentage(getDownloadPercentage(cafs.length));
  });
  callback(savedCount === cafs.length);
};

export {saveCaf};