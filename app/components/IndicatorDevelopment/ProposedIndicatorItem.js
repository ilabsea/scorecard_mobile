import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import indicatorHelper from '../../helpers/indicator_helper';
import itemStyles from '../../themes/scorecardListItemStyle';
import Color from '../../themes/color';
import Scorecard from '../../models/Scorecard';

import IndicatorTitle from './IndicatorTitle';

import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ProposedIndicatorItemTabletStyles from '../../styles/tablet/ProposedIndicatorItemStyle';
import ProposedIndicatorItemMobileStyles from '../../styles/mobile/ProposedIndicatorItemStyle';
import { getDeviceStyle, isShortScreenDevice } from '../../utils/responsive_util';
import { cardBorderRadius } from '../../constants/border_radius_constant';

const responsiveStyles = getDeviceStyle(ProposedIndicatorItemTabletStyles, ProposedIndicatorItemMobileStyles);

class ProposedIndicatorItem extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    let scorecard = Scorecard.find(props.indicator.scorecard_uuid);

    this.state = {
      indicator: indicatorHelper.getDisplayIndicator(props.indicator, scorecard),
      active: false
    };
  }

  handleSelected() {
    let state = !this.state.active;
    let action = state ? 'add' : 'remove';

    this.setState({active: state});
    !!this.props.onPress && this.props.onPress(this.props.indicator, action);
  }

  getListItemHeight = () => {
    const mobileHeight = isShortScreenDevice() ? hp('13%') : hp('11.5%');

    return getDeviceStyle(100, mobileHeight);
  }

  render() {
    const { translations } = this.context;
    const getBorderColor = this.state.active ? Color.headerColor : '#ccc';
    const getBorderWidth = this.state.active ? 2 : 1;

    return (
      <TouchableOpacity
        onPress={ () => this.handleSelected() }
        style={[itemStyles.listItem, { borderWidth: getBorderWidth, borderColor: getBorderColor, height: this.getListItemHeight(), borderRadius: cardBorderRadius}]}>
        <IndicatorTitle
          title={this.state.indicator.content}
          subText={translations.raisedTimes}
          indicatorCount={this.props.indicator.raised_count}
          indicator={this.state.indicator}
          customContainerStyle={[itemStyles.contentWrapper, {paddingLeft: 10, paddingTop: 0}]}
          customTitleStyle={responsiveStyles.titleText}
          customSubTextStyle={responsiveStyles.subText}
          customAudioContainerStyle={{justifyContent: 'center'}}
          playingUuid={this.props.playingUuid}
          updatePlayingUuid={this.props.updatePlayingUuid}
        />
      </TouchableOpacity>
    )
  }
}

export default ProposedIndicatorItem;