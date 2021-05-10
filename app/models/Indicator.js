import realm from '../db/schema';
import Scorecard from './Scorecard';
import CustomIndicator from './CustomIndicator';

const Indicator = (() => {
  return {
    filter,
  };

  // Filter predefinded and custom indicator by name or tag
  function filter(scorecardUuid, text) {
    const facilityId = Scorecard.find(scorecardUuid).facility_id;
    let indicators = realm.objects('Indicator').filtered(`facility_id = '${facilityId}' AND (name CONTAINS '${text}' OR tag CONTAINS '${text}')`);
    const customIndicators = CustomIndicator.filter(scorecardUuid, text);

    if (customIndicators.length > 0)
      indicators = [...indicators, ...customIndicators];

    return indicators;
  }
})();

export default Indicator;