import realm from '../db/schema';
import {getDownloadPercentage} from './scorecard_detail_service';

const saveCaf = async (scorecardUUID, cafs, updateDownloadPercentage, callback) => {
  let savedCount = 0;
  cafs.map((caf) => {
    const cafSet = {
      id: caf.id,
      name: caf.name,
      local_ngo_id: caf['local_ngo_id'],
      scorecard_uuid: scorecardUUID,
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