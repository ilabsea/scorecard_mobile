import realm from '../db/schema';

const saveIndicator =  (scorecardUUID, indicators, callback) => {
  indicators.map((indicator) => {
    console.log('save indicator ===== ', indicator)
    const indicatorSet = {
      id: indicator.id,
      name: indicator.name,
      facility_id: indicator.categorizable.id,
      scorecard_uuid: scorecardUUID,
      tag: indicator.tag_name,
    };
    realm.write(() => { realm.create('Indicator', indicatorSet, 'modified'); });
  });
  callback(true);
};

export {saveIndicator};
