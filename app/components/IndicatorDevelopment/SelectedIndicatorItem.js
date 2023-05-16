import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { removeFromSelected } from '../../actions/selectedIndicatorAction';
import { addToProposed } from '../../actions/proposedIndicatorAction';
import { LocalizationContext } from '../Translations';
import CustomAudioCard from '../Share/CustomAudioCard';
import SwipeLeftButton from '../Share/SwipeLeftButton';
import Color from '../../themes/color';
import indicatorHelper from '../../helpers/indicator_helper';
import indicatorDevelopmentHelper from '../../helpers/indicator_development_helper';
import Scorecard from '../../models/Scorecard';
import {bodyFontSize} from '../../utils/font_size_util';
import {getDeviceStyle} from '../../utils/responsive_util';

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

  renderCardTitle = () => {
    return <View style={{flexDirection: 'row', marginLeft: -14, marginTop: getDeviceStyle(18, 16)}}>
              <Icon name="more-vert" style={{color: Color.lightGrayColor, fontSize: 20, textAlign: 'center', marginTop: 3}} />
              <Text numberOfLines={2} style={{fontSize: bodyFontSize(), marginRight: 18}}>
                {this.props.order}. {this.state.indicator.content}
              </Text>
           </View>
  }

  renderContent() {
    return <CustomAudioCard
            itemUuid={this.state.indicator.indicator_uuid}
            customTitle={this.renderCardTitle()}
            subtitle={indicatorDevelopmentHelper.getCardSubtitle(this.props.indicator, this.context.translations)}
            subtitleStyle={{marginLeft: 6, marginBottom: getDeviceStyle(8, 6)}}
            audio={this.state.indicator.local_audio}
            playingUuid={this.props.playingUuid}
            updatePlayingUuid={(uuid) => this.props.updatePlayingUuid(uuid)}
            containerStyle={[{marginBottom: 6}, this.props.isActive && {backgroundColor: '#f5cfb6'}]}
            onLongPress={this.props.onLongPress}
          />
  }

  renderDeleteButton()  {
    return <SwipeLeftButton label={this.context.translations.delete} customStyle={{marginTop: 32, marginBottom: 6, width: 90}} onPress={() =>  this.handleRemoveIndicator()} />
  }

  render() {
    return (
      <Swipeable renderRightActions={() => this.renderDeleteButton()} ref={ref => { this.itemRef = ref }} enabled={!this.props.hasRating} containerStyle={{paddingTop: 6}}>
        <View style={{marginHorizontal: 2}}>{ this.renderContent() }</View>
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