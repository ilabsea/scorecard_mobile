import CustomIndicator from '../models/CustomIndicator';
import { getAttributesByColumns } from '../helpers/scorecard_attributes_helper';

const proposedIndicatorHelper = (() => {
  return {
    getProposedIndicatorAttributes
  };

  function getProposedIndicatorAttributes(scorecard, proposedIndicators, columns, hasTag) {
    return proposedIndicators.map(proposedIndicator => {
      let indicator = _getIndicatorAttrs(proposedIndicator, scorecard);
      let attr = getAttributesByColumns(proposedIndicator, columns);

      attr.indicatorable_id = indicator.id;
      attr.indicatorable_type = indicator.type;

      if (!!hasTag) {
        attr.tag_attributes = { name: indicator.tag }
      }

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
      indicatorable_type = 'CustomIndicator';
    }

    return { id: indicatorable_id, type: indicatorable_type };
  }
})();

export default proposedIndicatorHelper;