import Indicator from '../models/Indicator';
import VotingIndicator from '../models/VotingIndicator';
import { getAttributesByColumns } from '../helpers/scorecard_attributes_helper';
import { getLanguageIndicator } from '../services/language_indicator_service';

const proposedIndicatorHelper = (() => {
  return {
    getProposedIndicatorAttributes,
    getOrderedSelectedProposedIndicators,
    getDisplayName,
  };

  function getProposedIndicatorAttributes(scorecard, selectedIndicators, columns, isRaisedIndicatorAttrs) {
    return selectedIndicators.map(selectedIndicator => {
      let indicatorAttrs = _getIndicatorAttrs(selectedIndicator);
      let attr = getAttributesByColumns(selectedIndicator, columns);

      attr.indicatorable_type = indicatorAttrs.type;
      attr.indicatorable_id = indicatorAttrs.indicatorable_id;
      attr.indicator_uuid = indicatorAttrs.indicator_uuid;

      if (!!isRaisedIndicatorAttrs) {
        const votingIndicator = VotingIndicator.find(scorecard.uuid, indicator.id);
        attr.tag_attributes = { name: selectedIndicator.tag }
        attr.selected = !!votingIndicator ? true : false;
        attr.voting_indicator_uuid = !!votingIndicator ? votingIndicator.uuid : null;
      }
      else 
        attr.uuid = selectedIndicator.uuid;    // the uuid of the votingCriteria

      return attr;
    })
  }

  function getOrderedSelectedProposedIndicators(selectedIndicators, orderedIndicatorableIds) {
    let orderedIndicators = [];

    for (let i = 0; i < orderedIndicatorableIds.length; i++) {
      const filteredIndicators = selectedIndicators.filter(indicator => indicator.indicatorable_id == orderedIndicatorableIds[i]);

      if (filteredIndicators.length == 0)
        continue;

      orderedIndicators.push(filteredIndicators[0]);
    }

    return orderedIndicators;
  }

  function getDisplayName(proposedIndicator, scorecardUuid) {
    const languageIndicator = getLanguageIndicator(scorecardUuid, proposedIndicator.indicatorable_id, 'text');
    return !!languageIndicator ? languageIndicator.content : proposedIndicator.indicatorable_name;
  }

  // private methods

  function _getIndicatorAttrs(selectedIndicator) {
    const indicator = Indicator.find(selectedIndicator.indicatorable_id, selectedIndicator.indicatorable_type);
  
    const indicatorAttrs = {
      'custom': { type: 'Indicators::CustomIndicator', indicator_uuid: selectedIndicator.indicatorable_id },
      'predefined': { type: 'Indicator', indicator_uuid: indicator.indicator_uuid }
    }
    indicatorAttrs[indicator.type]['indicatorable_id'] = indicator.id;

    return indicatorAttrs[indicator.type];
  }
})();

export default proposedIndicatorHelper;