import ScorecardImage from '../models/ScorecardImage';

const scorecardImageService = (() => {
  return {
    add,
    remove
  }

  function add(scorecardUuid, image) {
    const attrs = {
      scorecard_uuid: scorecardUuid,
      image_path: image.path,
    }

    ScorecardImage.create(attrs);
  }

  function remove(scorecardUuid, selectedImages, callback) {
    selectedImages.map(selectedImage => {
      ScorecardImage.destroy(scorecardUuid, selectedImage);
    });

    const scorecardImages = ScorecardImage.findByScorecard(scorecardUuid);
    callback(scorecardImages);
  }
})();

export default scorecardImageService;