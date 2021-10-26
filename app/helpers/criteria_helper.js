import { environment } from '../config/environment';
import Scorecard from '../models/Scorecard';

const criteriaHelper = (() => {
  return {
    allowTourTip,
    getOrderedCriterias,
  }

  function allowTourTip(scorecardUuid) {
    return (!Scorecard.tourTipShown(scorecardUuid) && environment.enableTourTip);
  }

  function getOrderedCriterias(selectedCriterias, orderedIndicatorableIds) {
    let orderedCriterias = [];

    for (let i = 0; i < orderedIndicatorableIds.length; i++) {
      const filteredCriterias = selectedCriterias.filter(criteria => criteria.indicatorable_id == orderedIndicatorableIds[i]);

      if (filteredCriterias.length == 0)
        continue;

      orderedCriterias.push(filteredCriterias[0]);
    }

    return orderedCriterias;
  }
})();

export default criteriaHelper;