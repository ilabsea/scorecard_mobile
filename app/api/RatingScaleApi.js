import BaseApi from './BaseApi';
class RatingScaleApi extends BaseApi {
  constructor() {
    super('programs', 'rating_scales');
  }
}

export default RatingScaleApi;
