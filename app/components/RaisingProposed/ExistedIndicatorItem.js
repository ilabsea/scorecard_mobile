import React from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import CriteriaSelectionItems from './CriteriaSelectionItems';

import IndicatorService from '../../services/indicator_service';
import createNewIndicatorHelper from '../../helpers/create_new_indicator_helper';
import { bodyFontSize } from '../../utils/font_size_util';

class ExistedIndicatorItem extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.indicators = [];
    this.selectedIndicators = [];
  }

  selectIndicator(index) {
    const indicatorSelection = createNewIndicatorHelper.getIndicatorSelection(index, this.indicators, this.props.selectedIndicators, this.props.unselectedIndicators);
    const { selectedIndicators, unselectedIndicators } = indicatorSelection;
    const updatedIndicators = createNewIndicatorHelper.getUpdatedIndicators(this.props.indicators, unselectedIndicators);

    this.props.updateIndicators(updatedIndicators);
    this.props.selectIndicator(selectedIndicators, unselectedIndicators, false);
    this.props.clearInputs();
  }

  render() {
    if (this.props.indicatorName === '')
      return;

    const indicatorDataSet = new IndicatorService().getDuplicatedIndicator(this.props.scorecardUuid, this.props.indicatorName, this.props.selectedIndicators);
    this.indicators = indicatorDataSet.indicators;
    this.selectedIndicators = indicatorDataSet.selectedIndicators;
    const label = this.selectedIndicators.length > 0 ? this.context.translations.thisIndicatorIsAlreadySelected : this.context.translations.tapOnTheIndicatorBelowToSelect;

    return (
      <View>
        <Text style={{marginTop: 20, fontSize: bodyFontSize()}}>{ label }</Text>

        <CriteriaSelectionItems
          indicators={indicatorDataSet.indicators}
          selectedIndicators={indicatorDataSet.selectedIndicators}
          isSearching={false}
          scorecardUuid={this.props.scorecardUuid}
          selectIndicator={(index) => this.selectIndicator(index)}
          customCardStyle={{ marginLeft: 0, width: '100%' }}
        />
      </View>
    )
  }
}

export default ExistedIndicatorItem;