import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4';

const saveIndicator =  (scorecardUUID, indicators, callback) => {
  let savedCount = 0;
  indicators.map((indicator) => {
    if (!isExist(indicator.id)) {
      const indicatorSet = {
        uuid: uuidv4(),
        id: indicator.id,
        name: indicator.name,
        facility_id: indicator.categorizable.id,
        scorecard_uuid: scorecardUUID,
        tag: indicator.tag_name
      };
      realm.write(() => {
        realm.create('Indicator', indicatorSet, 'modified');
      });
    }
    savedCount += 1;
  });
  callback(savedCount === indicators.length);
};

const isExist = (indicatorId) => {
  const indicator = realm.objects('Indicator').filtered(`id == ${indicatorId}`)[0];
  return indicator === undefined ? false : true;
}

const getAll = (scorecardUuid) => {
  const facilityId = realm.objects('Scorecard').filtered(`uuid == '${scorecardUuid}'`)[0].facility_id;
  let predefinedIndicators = JSON.parse(JSON.stringify(realm.objects('Indicator').filtered(`facility_id = '${facilityId}'`)));
  const customIndicators = JSON.parse(JSON.stringify(realm.objects('CustomIndicator').filtered(`scorecard_uuid = '${scorecardUuid}'`)));
  return predefinedIndicators.concat(customIndicators);
}

const getDisplayIndicator = (indicatorable, scorecardObj) => {
  const scorecard = scorecardObj || realm.objects('Scorecard').filtered(`uuid='${indicatorable.scorecard_uuid}'`)[0];

  if ( indicatorable.indicatorable_type == 'predefined' ) {
    let indi = realm.objects('LanguageIndicator').filtered(`indicator_id='${indicatorable.indicatorable_id}' AND language_code='${scorecard.audio_language_code}'`)[0];
    indi = indi || realm.objects('Indicator').filtered(`id='${indicatorable.indicatorable_id}'`)[0];
    indi = JSON.parse(JSON.stringify(indi));
    indi.content = indi.content || indi.name;

    if (!scorecard.isSameLanguageCode) {
      let textIndi = realm.objects('LanguageIndicator').filtered(`indicator_id='${indicatorable.indicatorable_id}' AND language_code='${scorecard.text_language_code}'`)[0];
      indi.content = !!textIndi && textIndi.content;
    }

    return indi;
  }

  return JSON.parse(JSON.stringify(realm.objects('CustomIndicator').filtered(`uuid='${indicatorable.indicatorable_id}'`)[0]));
}

export {
  saveIndicator,
  getDisplayIndicator,
  getAll,
};
