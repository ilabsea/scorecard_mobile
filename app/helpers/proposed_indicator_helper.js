import VotingCriteria from '../models/VotingCriteria';
import Indicator from '../models/Indicator';
import { getAttributesByColumns } from '../helpers/scorecard_attributes_helper';
import { getLanguageIndicator } from '../services/language_indicator_service';
import { CUSTOM } from '../constants/indicator_constant';

const proposedIndicatorHelper = (() => {
  return {
    getProposedIndicatorAttributes,
    getOrderedSelectedProposedIndicators,
    getDisplayName,
  };

  function getProposedIndicatorAttributes(scorecard, selectedIndicators, columns, isRaisedIndicatorAttrs) {
    return selectedIndicators.map(selectedIndicator => {
      let indicator = _getIndicatorAttrs(selectedIndicator);
      let attr = getAttributesByColumns(selectedIndicator, columns);

      const indicatorIds = _getIndicatorIds(selectedIndicator);
      attr.indicatorable_type = indicator.type;
      attr.indicatorable_id = indicatorIds.indicator_id;
      attr.indicator_uuid = indicatorIds.indicator_uuid;

      if (!!isRaisedIndicatorAttrs) {
        const votingIndicator = VotingCriteria.find(scorecard.uuid, indicator.indicatorable_id);
        attr.tag_attributes = { name: indicator.tag }
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

  function _getIndicatorAttrs(indicator) {
    const indicatorable_type = indicator.indicatorable_type === CUSTOM ? 'Indicators::CustomIndicator' : 'Indicator';

    return { indicatorable_id: indicator.indicatorable_id, type: indicatorable_type };
  }

  function _getIndicatorIds(selectedIndicator) {
    const indicator = Indicator.find(selectedIndicator.indicatorable_id, selectedIndicator.indicatorable_type);

    console.log('INIDIDIDI == ', indicator);

    return {
      indicator_uuid: selectedIndicator.indicatorable_type === CUSTOM ? selectedIndicator.indicatorable_id : indicator.indicator_uuid,
      indicator_id: selectedIndicator.indicatorable_type === CUSTOM ? indicator.id : selectedIndicator.indicatorable_id,
    }
  }
})();

export default proposedIndicatorHelper;