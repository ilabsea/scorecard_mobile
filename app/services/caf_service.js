import realm from '../db/schema';
import CafApi from '../api/CafApi';
import { handleApiResponse } from './api_service';
import { isPhaseDownloaded } from './scorecard_download_service';
import { cafPhase, INFO } from '../constants/scorecard_constant';

const save = async (scorecardUuid, localNgoId, successCallback, errorCallback) => {
  if (isPhaseDownloaded(scorecardUuid, cafPhase, INFO)) {
    successCallback(true, cafPhase);
    return;
  }

  const cafApi = new CafApi();
  const response = await cafApi.load(localNgoId);

  handleApiResponse(response, (cafs) => {
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
    });

    successCallback(savedCount === cafs.length, cafPhase);
  }, (error) => {
    console.log('error download caf = ', error);
    errorCallback();
  });
};

export { save };