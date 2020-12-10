import realm from '../db/schema';
import {getDownloadPercentage} from './scorecard_detail_service';

const saveIndicator =  (scorecardUUID, indicators, updateDownloadPercentage, callback) => {
  let savedCount = 0;
  indicators.map((indicator) => {
    const indicatorSet = {
      id: indicator.id,
      name: indicator.name,
      facility_id: indicator.categorizable.id,
      scorecard_uuid: scorecardUUID,
      tag: indicator.tag_name
    };
    realm.write(() => {
      realm.create('Indicator', indicatorSet, 'modified');
      savedCount += 1;
    });
    updateDownloadPercentage(getDownloadPercentage(indicators.length));
  });
  if (savedCount == indicators.length)
    callback(true);
  else
    callback(false);
};

const getIndicatorName = (indicatorName) => {
  return indicatorName.includes(':') ? indicatorName.split(':').pop() : indicatorName;
}

const getIndicatorShortcutName = (indicatorName) => {
  return indicatorName.includes(':') ? indicatorName.split(':')[0] : indicatorName.substr(0, 4);
}

export {saveIndicator, getIndicatorName, getIndicatorShortcutName};
