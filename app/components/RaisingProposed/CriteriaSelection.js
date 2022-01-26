import React, {Component} from 'react';
import { LayoutAnimation, UIManager } from 'react-native';

import {LocalizationContext} from '../Translations';
import RaisingProposedScrollView from './RaisingProposedScrollView';
import CriteriaSelectionItems from './CriteriaSelectionItems';
import AddNewIndicatorButton from './AddNewIndicatorButton';
import NoIndicatorMessage from './NoIndicatorMessage';

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

  selectIndicator = (indicatorUuid) => {
    const {selectedIndicators, unselectedIndicators} = this.props;
    const newDataset = createNewIndicatorHelper.toggleIndicator(indicatorUuid, this.state.indicators, selectedIndicators, unselectedIndicators);
    const { newIndicators, newSelectedIndicators, newUnselectedIndicators } = newDataset;

    this.setState({
      indicators: newIndicators,
      selectedIndicators: newSelectedIndicators,
      unselectedIndicators: newUnselectedIndicators,
    }, () => {
      this.props.selectIndicator(newSelectedIndicators, newUnselectedIndicators);
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
        { this.state.indicators.length > 0 &&
          <RaisingProposedScrollView onScroll={(event) => this.onScroll(event)}>
            <CriteriaSelectionItems
              indicators={this.state.indicators}
              selectedIndicators={this.state.selectedIndicators}
              groupedIndicators={this.props.groupedIndicators}
              isSearching={this.props.isSearching}
              scorecardUuid={this.props.scorecardUuid}
              selectIndicator={this.selectIndicator}
            />
          </RaisingProposedScrollView>
        }

        { this.state.indicators.length === 0 && <NoIndicatorMessage /> }

        { !this.props.isSearching && this.renderAddNewIndicatorButton() }
      </React.Fragment>
    )
  }
}

export default CriteriaSelection;