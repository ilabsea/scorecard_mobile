import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';

import { removeFromSelected } from '../../actions/selectedIndicatorAction';
import { addToProposed } from '../../actions/proposedIndicatorAction';

import { LocalizationContext } from '../Translations';
import styles from '../../themes/scorecardListItemStyle';
import indicatorHelper from '../../helpers/indicator_helper';
import Scorecard from '../../models/Scorecard';

import IndicatorTitle from './IndicatorTitle';

import { getDeviceStyle } from '../../utils/responsive_util';
import SelectedIndicatorItemTabletStyles from '../../styles/tablet/SelectedIndicatorItemComponentStyle';
import SelectedIndicatorItemMobileStyles from '../../styles/mobile/SelectedIndicatorItemComponentStyle';

const responsiveStyles = getDeviceStyle(SelectedIndicatorItemTabletStyles, SelectedIndicatorItemMobileStyles);

class SelectedIndicatorItem extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.scorecard = Scorecard.find(props.indicator.scorecard_uuid);

    this.state = {
      indicator: indicatorHelper.getDisplayIndicator(props.indicator, this.scorecard),
      scorecard: this.scorecard,
    };

    this.isComponentUnmount = false;
    this.itemRef = null;
  }

  static getDerivedStateFromProps(props, state) {
    return { indicator: indicatorHelper.getDisplayIndicator(props.indicator, state.scorecard) };
  }

  async componentDidMount() {
    const tooltipShown = await AsyncStorage.getItem('DRAG_DROP_TOOLTIP');

    setTimeout(() => {
      if (!this.isComponentUnmount && !tooltipShown)
        this.props.updateFirstVisitStatus(true);
    }, 200);
  }

  componentWillUnmount() {
    this.isComponentUnmount = true;
  }

  handleRemoveIndicator() {
    this.itemRef.close();

    setTimeout(() => {
      this.props.addToProposed(this.props.indicator);
      this.props.removeFromSelected(this.props.indicator);
    }, 20);
  }

  renderContent() {
    return (
      <View style={[styles.listItem, styles.card, responsiveStyles.itemContainer, this.props.isActive ? responsiveStyles.selectedItem : {}]}>
        <IndicatorTitle
          title={this.state.indicator.content}
          order={this.props.order}
          subText={this.context.translations.raisedTimes}
          indicatorCount={this.props.indicator.count}
          indicator={this.state.indicator}
          customContainerStyle={responsiveStyles.container}
          customTitleStyle={responsiveStyles.titleText}
          customSubTextStyle={responsiveStyles.subText}
          customAudioContainerStyle={{justifyContent: 'center'}}
          isDraggable={this.props.isDraggable}
          onLongPress={this.props.onLongPress}
          playingUuid={this.props.playingUuid}
          updatePlayingUuid={this.props.updatePlayingUuid}
        />
      </View>
    )
  }

  renderDeleteButton()  {
    return (
      <RectButton onPress={() => this.handleRemoveIndicator()} style={responsiveStyles.removeButton}>
        <Text style={responsiveStyles.removeLabel}>{ this.context.translations.delete }</Text>
      </RectButton>
    )
  }

  render() {
    return (
      <Swipeable renderRightActions={() => this.renderDeleteButton()} ref={ref => { this.itemRef = ref }} enabled={!this.props.hasRating}>
        { this.renderContent() }
      </Swipeable>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeFromSelected: (indicator) => dispatch(removeFromSelected(indicator)),
    addToProposed: (indicator) => dispatch(addToProposed(indicator)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(SelectedIndicatorItem);