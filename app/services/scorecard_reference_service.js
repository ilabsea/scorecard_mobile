import ScorecardReference from '../models/ScorecardReference';
import ScorecardReferenceApi from '../api/ScorecardReferenceApi';

import { handleApiResponse, getErrorType, sendRequestToApi } from './api_service';

const scorecardReferenceService = (() => {
  return {
    add,
    remove,
    upload
  }

  function add(scorecardUuid, image) {
    const attrs = {
      scorecard_uuid: scorecardUuid,
      image_path: image.path,
    }

    ScorecardReference.create(attrs);
  }

  function remove(scorecardUuid, selectedImages, callback) {
    selectedImages.map(selectedImage => {
      ScorecardReference.destroy(scorecardUuid, selectedImage);
    });

    const scorecardReferences = ScorecardReference.findByScorecard(scorecardUuid);
    callback(scorecardReferences);
  }

  function upload(scorecardUuid, updateProgress, successCallback, errorCallback) {
    let scorecardReferences = JSON.parse(JSON.stringify(ScorecardReference.findByScorecard(scorecardUuid)));
    scorecardReferences.sort((a,b) => a.order > b.order && 1 || -1);

    _uploadReference(0, scorecardReferences, updateProgress, successCallback, errorCallback);
  }

  // private method
  function _uploadReference(index, scorecardReferences, updateProgress, successCallback, errorCallback) {
    console.log('scorecard reference length = ', scorecardReferences.length);

    if (index == scorecardReferences.length) {
      successCallback();
      return;
    }

    const scorecardUuid = scorecardReferences[index].scorecard_uuid;
    sendRequestToApi(() => {
      console.log('++ upload scorecard reference')
      return new ScorecardReferenceApi().post(scorecardUuid, _scorecardReferenceData(index, scorecardReferences[index]))
    }, (response) => {
      updateProgress();
      _uploadReference(index + 1, scorecardReferences, updateProgress, successCallback, errorCallback);
    }, (error) => errorCallback(getErrorType(error.status)) );
  }

  function _scorecardReferenceData(index, scorecardReference) {
    const attrs = {
      kind: 'swot_result',
    }

    let data = new FormData();
    data.append('scorecard_reference', JSON.stringify(attrs));

    data.append('attachment', {
      uri: scorecardReference.image_path,
      type: 'image/jpeg',
      name: `reference_image${index + 1}.jpg`
    });

    return data;
  }
})();

export default scorecardReferenceService;