import CustomIndicator from '../models/CustomIndicator';
import VotingCriteria from '../models/VotingCriteria';
import { getAttributesByColumns } from '../helpers/scorecard_attributes_helper';

const proposedIndicatorHelper = (() => {
  return {
    getProposedIndicatorAttributes
  };

  function getProposedIndicatorAttributes(scorecard, selectedIndicators, columns, isRaisedIndicatorAttrs) {
    return selectedIndicators.map(selectedIndicator => {
      let indicator = _getIndicatorAttrs(selectedIndicator, scorecard);
      let attr = getAttributesByColumns(selectedIndicator, columns);

      attr.indicatorable_id = indicator.id;
      attr.indicatorable_type = indicator.type;

      if (!!isRaisedIndicatorAttrs) {
        const votingIndicator = VotingCriteria.find(scorecard.uuid, indicator.id);
        attr.tag_attributes = { name: indicator.tag }
        attr.selected = !!votingIndicator ? true : false;
        attr.voting_indicator_uuid = !!votingIndicator ? votingIndicator.uuid : null;
      }
      else 
        attr.uuid = selectedIndicator.uuid;

      return attr;
    })
  }

  // private methods
  function _getIndicatorAttrs(indicator, scorecard) {
    let indicatorable_id = indicator.indicatorable_id;
    let indicatorable_type = 'Indicator';
    const customIndicators = CustomIndicator.getAll(scorecard.uuid);

    if (indicator.indicatorable_type != 'predefined') {
      indicatorable_id = customIndicators.filter(x => x.uuid == indicatorable_id)[0].id_from_server;
      indicatorable_type = 'Indicators::CustomIndicator';
    }

    return { id: indicatorable_id, type: indicatorable_type };
  }
})();

export default proposedIndicatorHelper;
