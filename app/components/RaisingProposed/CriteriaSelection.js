import React, {Component} from 'react';

import {LocalizationContext} from '../Translations';
import RaisingProposedScrollView from './RaisingProposedScrollView';
import CriteriaSelectionItems from './CriteriaSelectionItems';

import indicatorHelper from '../../helpers/indicator_helper';
import createNewIndicatorHelper from '../../helpers/create_new_indicator_helper';

class CriteriaSelection extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      indicators: props.indicators,
      selectedIndicators: [],
      unselectedIndicators: [],
      isModalVisible: false,
      participantUuid: props.participantUuid,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.participantUuid != state.participantUuid)
      return { indicators: props.indicators, selectedIndicators: props.selectedIndicators }

    return indicatorHelper.getIndicatorsState(props, state)
  }

  selectIndicator = (index) => {
    const indicatorSelection = createNewIndicatorHelper.getIndicatorSelection(index, this.state.indicators, this.props.selectedIndicators, this.props.unselectedIndicators);
    const { indicators, selectedIndicators, unselectedIndicators } = indicatorSelection;

    this.setState({
      indicators,
      selectedIndicators,
      unselectedIndicators,
      isModalVisible: createNewIndicatorHelper.isAddNewIndicatorSection(index, indicators),
    }, () => {
      this.props.selectIndicator(selectedIndicators, unselectedIndicators, this.state.isModalVisible);
    });
  }

  render() {
    return (
      <RaisingProposedScrollView>
        <CriteriaSelectionItems
          indicators={this.state.indicators}
          selectedIndicators={this.state.selectedIndicators}
          isSearching={this.props.isSearching}
          scorecardUuid={this.props.scorecardUuid}
          selectIndicator={this.selectIndicator}
        />
      </RaisingProposedScrollView>
    )
  }
}

export default CriteriaSelection;