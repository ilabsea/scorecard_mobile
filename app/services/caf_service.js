import CafApi from '../api/CafApi';
import { handleApiResponse } from './api_service';
import { isPhaseDownloaded } from './scorecard_download_service';
import { cafPhase } from '../constants/scorecard_constant';
import Caf from '../models/Caf';

const save = (scorecardUuid, localNgoId, successCallback, errorCallback) => {
  if (isPhaseDownloaded(scorecardUuid, cafPhase)) {
    successCallback(true, cafPhase);
    return;
  }

  loadCaf(localNgoId, successCallback, errorCallback)
};

const loadCaf = async (localNgoId, successCallback, errorCallback) => {
  const cafApi = new CafApi();
  const response = await cafApi.load(localNgoId);

  handleApiResponse(response, (cafs) => {
    let savedCount = 0;

    Caf.deleteByLngoId(localNgoId);

    cafs.map((caf) => {
      const cafSet = {
        id: caf.id,
        name: caf.name,
        local_ngo_id: caf['local_ngo_id'],
      };
      Caf.create(cafSet, () => { savedCount += 1 });
    });

    successCallback(savedCount === cafs.length, cafPhase);
  }, (error) => {
    errorCallback(error);
  });
}

export { save, loadCaf };