import React from 'react';
import { LayoutAnimation, UIManager } from 'react-native';

import {LocalizationContext} from '../Translations';
import RaisingProposedScrollView from './RaisingProposedScrollView';
import CriteriaSelectionItems from './CriteriaSelectionItems';
import NoIndicatorMessage from './NoIndicatorMessage';
import AddNewIndicatorButton from './AddNewIndicatorButton';
import CustomIndicator from '../../models/CustomIndicator'
import createNewIndicatorHelper from '../../helpers/create_new_indicator_helper';
import indicatorHelper from '../../helpers/indicator_helper';

let _this = null;

class IndicatorList extends React.Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      indicators: props.indicators,
      selectedIndicators: props.selectedIndicators,
      unselectedIndicators: [],
      participantUuid: props.participantUuid,
      scrollDirection: 'up',
    };
    this.scrollOffset = 0;
    _this = this;

    if (!props.isEdit && !props.isSearching && UIManager.setLayoutAnimationEnabledExperimental)
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.participantUuid != state.participantUuid)
      return { indicators: props.indicators, selectedIndicators: props.selectedIndicators }

    return indicatorHelper.getIndicatorsState(props, state)
  }

  onScroll(event) {
    if (_this.props.isEdit || _this.props.isSearching)
      return;

    const currentOffset = event.nativeEvent.contentOffset.y;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    this.setState({ scrollDirection: currentOffset > this.scrollOffset ? 'down' : 'up' });
    this.scrollOffset = currentOffset;
  }

  toggleIndicator(indicatorUuid) {
    if (_this.props.isEdit)
      _this.props.editCustomIndicator(CustomIndicator.find(indicatorUuid));
    else {
      const {indicators, selectedIndicators, unselectedIndicators} = _this.props;
      const newDataset = createNewIndicatorHelper.toggleIndicator(indicatorUuid, indicators, selectedIndicators, unselectedIndicators);
      const { newIndicators, newSelectedIndicators, newUnselectedIndicators } = newDataset;

      _this.setState({
        indicators: newIndicators,
        selectedIndicators: newSelectedIndicators,
        unselectedIndicators: newUnselectedIndicators,
      }, () => {
        _this.props.selectIndicator(newSelectedIndicators, newUnselectedIndicators, false);
      });
    }
  }

  getSelectedIndicators() {
    let selectedIndicators = this.props.selectedIndicators;
    if (this.props.isEdit)
      selectedIndicators = _this.props.selectedCustomIndicator ? [_this.props.selectedCustomIndicator] : [];
    
    return selectedIndicators;
  }

  renderList() {
    return (
      <RaisingProposedScrollView onScroll={(event) => _this.onScroll(event)}>
        <CriteriaSelectionItems
          indicators={this.props.indicators}
          selectedIndicators={this.getSelectedIndicators()}
          groupedIndicators={this.props.groupedIndicators}
          isSearching={this.props.isSearching}
          scorecardUuid={this.props.scorecardUuid}
          selectIndicator={this.toggleIndicator}
          isEdit={this.props.isEdit}
        />
      </RaisingProposedScrollView>
    )
  }

  renderAddNewIndicatorButton() {
    return <AddNewIndicatorButton
             scrollDirection={this.state.scrollDirection}
             showAddNewIndicatorForm={() => this.props.selectIndicator(this.props.selectedIndicators, this.props.unselectedIndicators, true)}
           />
  }

  render() {
    return (
      <React.Fragment>
        { this.state.indicators.length > 0 ? this.renderList() : <NoIndicatorMessage /> }

        { !this.props.isSearching && !this.props.isEdit && this.renderAddNewIndicatorButton() }
      </React.Fragment>
    )
  }
}

export default IndicatorList;