import React, {Component} from 'react';
import { LayoutAnimation, UIManager } from 'react-native';

import {LocalizationContext} from '../Translations';
import RaisingProposedScrollView from './RaisingProposedScrollView';
import CriteriaSelectionItems from './CriteriaSelectionItems';
import AddNewIndicatorButton from './AddNewIndicatorButton';

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
      participantUuid: props.participantUuid,
      scrollDirection: 'up',
    };
    this.scrollOffset = 0;

    if (UIManager.setLayoutAnimationEnabledExperimental)
      UIManager.setLayoutAnimationEnabledExperimental(true);
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
    }, () => {
      this.props.selectIndicator(selectedIndicators, unselectedIndicators, false);
    });
  }

  showAddNewIndicatorForm() {
    this.props.selectIndicator(this.props.selectedIndicators, this.props.unselectedIndicators, true);
  }

  renderAddNewIndicatorButton() {
    return <AddNewIndicatorButton
             scrollDirection={this.state.scrollDirection}
             showAddNewIndicatorForm={() => this.showAddNewIndicatorForm()}
           />
  }

  onScroll(event) {
    const currentOffset = event.nativeEvent.contentOffset.y;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    this.setState({ scrollDirection: currentOffset > this.scrollOffset ? 'down' : 'up' });
    this.scrollOffset = currentOffset;
  }

  render() {
    return (
      <React.Fragment>
        <RaisingProposedScrollView onScroll={(event) => this.onScroll(event)}>
          <CriteriaSelectionItems
            indicators={this.state.indicators}
            selectedIndicators={this.state.selectedIndicators}
            isSearching={this.props.isSearching}
            scorecardUuid={this.props.scorecardUuid}
            selectIndicator={this.selectIndicator}
          />
        </RaisingProposedScrollView>

        { this.renderAddNewIndicatorButton() }
      </React.Fragment>
    )
  }
}

export default CriteriaSelection;