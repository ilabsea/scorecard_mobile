import realm from '../db/schema';

const saveIndicator =  (scorecardUUID, indicators, callback) => {
  indicators.map((indicator) => {
    const indicatorSet = {
      id: indicator.id,
      name: indicator.name,
      facility_id: indicator.categorizable.id,
      scorecard_uuid: scorecardUUID,
    };
    realm.write(() => { realm.create('Indicator', indicatorSet, 'modified'); });
  });
  callback(true);
};

export {saveIndicator};