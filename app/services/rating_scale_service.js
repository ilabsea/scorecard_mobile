import realm from '../db/schema';
import RatingScaleApi from '../api/RatingScaleApi';
import { isPhaseDownloaded } from './scorecard_download_service';
import { saveLanguageRatingScale } from './language_rating_scale_service';

import { handleApiResponse } from './api_service';
import { ratingScalePhase } from '../constants/scorecard_constant';

const save = async (scorecardUuid, programId, successCallback, errorCallback) => {
  if (isPhaseDownloaded(scorecardUuid, ratingScalePhase)) {
    successCallback(true, ratingScalePhase);
    return;
  }

  const ratingScaleApi = new RatingScaleApi();
  const response = await ratingScaleApi.load(programId);

  handleApiResponse(response,
    (ratingScales) => {
      const options = {
        ratingScales: ratingScales,
        programId: programId,
        scorecardUuid: scorecardUuid,
      };

      _saveRatingScale(0, options, successCallback);
    },
    (error) => {
      console.log('error download rating scale = ', error);
      errorCallback();
    }
  );
}

function _saveRatingScale(index, options, successCallback) {
  const { ratingScales, programId, scorecardUuid } = options;

  if (index === ratingScales.length) {
    successCallback(true, ratingScalePhase);
    return;
  }

  const ratingScale = ratingScales[index];
  const attrs = {
    id: ratingScale.id,
    name: ratingScale.name,
    value: ratingScale.value,
    program_id: programId,
  };
  realm.write(() => {
    realm.create('RatingScale', attrs, 'modified');
  });

  const langRatingScales = ratingScale.language_rating_scales;
  saveLanguageRatingScale(0, langRatingScales, ratingScale, programId, scorecardUuid, () => {
    _saveRatingScale(index + 1, options, successCallback)
  });
}

export { save };