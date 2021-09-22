import React, {Component} from 'react';

import {LocalizationContext} from '../Translations';
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
    };
  }

  static getDerivedStateFromProps(props, state) {
    return indicatorHelper.getIndicatorsState(props, state)
  }

  selectIndicator = (indicatorUuid, isAddNew) => {
    const {selectedIndicators, unselectedIndicators} = this.props;
    const newDataset = createNewIndicatorHelper.toggleIndicator(indicatorUuid, this.state.indicators, selectedIndicators, unselectedIndicators);
    const { newIndicators, newSelectedIndicators, newUnselectedIndicators } = newDataset;

    this.setState({
      indicators: newIndicators,
      selectedIndicators: newSelectedIndicators,
      unselectedIndicators: newUnselectedIndicators,
      isModalVisible: isAddNew,
    }, () => {
      this.props.selectIndicator(newSelectedIndicators, newUnselectedIndicators, this.state.isModalVisible);
    });
  }

  renderIndicators() {
    return (
      <CriteriaSelectionItems
        indicators={this.state.indicators}
        selectedIndicators={this.state.selectedIndicators}
        groupedIndicators={this.props.groupedIndicators}
        isSearching={this.props.isSearching}
        scorecardUuid={this.props.scorecardUUID}
        selectIndicator={this.selectIndicator}
      />
    )
  }

  render() {
    return (
      <RaisingProposedScrollView>
        {doms}
      </RaisingProposedScrollView>
    )
  }
}

export default CriteriaSelection;