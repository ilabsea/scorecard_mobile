import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import Color from '../../themes/color';
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
    this.props.removeFromSelected(this.props.indicator);
    this.props.addToProposed(this.props.indicator);
  }

  renderRemoveButton() {
    const buttonColor = this.props.hasRating ? Color.disabledBtnBg : Color.redColor;

    return (
      <TouchableOpacity onPress={() => this.handleRemoveIndicator()} style={responsiveStyles.removeButton} disabled={this.props.hasRating}>
        <Icon name='trash' size={16} style={[responsiveStyles.removeIcon, { color: buttonColor }]} />
        <Text style={[styles.buttonLabel, responsiveStyles.removeLabel, { color: buttonColor }]}>
          { this.context.translations['remove'] }
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { translations } = this.context;

    return (
      <View style={[styles.listItem, styles.card, responsiveStyles.itemContainer]}>
        <View style={[responsiveStyles.listItem, this.props.isActive ? responsiveStyles.selectedItem : {}]}>

          <IndicatorTitle
            title={this.state.indicator.content}
            order={this.props.order}
            subText={translations.raisedTimes}
            indicatorCount={this.props.indicator.count}
            indicator={this.state.indicator}
            customContainerStyle={responsiveStyles.container}
            customTitleStyle={responsiveStyles.titleText}
            customSubTextStyle={responsiveStyles.subText}
            customAudioContainerStyle={{justifyContent: 'center'}}
            isDraggable={this.props.isDraggable}
            onLongPress={this.props.onLongPress}
          />

          <View style={[responsiveStyles.viewDetailContainer]}>
            <TouchableOpacity onLongPress={() => this.props.onLongPress()} style={{flexGrow: 1, height: '100%'}} />
            { this.renderRemoveButton() }
          </View>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    removeFromSelected: (indicator) => dispatch(removeFromSelected(indicator)),
    addToProposed: (indicator) => dispatch(addToProposed(indicator)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectedIndicatorItem);