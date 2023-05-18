import React, {Component} from 'react';
import { Title, Button } from "native-base";
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { LocalizationContext } from '../Translations';
import NavigationHeader from '../NavigationHeader';
import { getDeviceStyle, isShortWidthScreen } from '../../utils/responsive_util';
import { pressableItemSize } from '../../utils/component_util';
import { navigationHeaderTitleFontSize } from '../../utils/font_size_util';

class FilterScorecardHeader extends Component {
  static contextType = LocalizationContext;
  
  _onPress() {
    !!this.props.onBackPress && this.props.onBackPress()
  }

  renderRightButton() {
    return (
      <Button transparent onPress={() => this.props.resetFilter()} style={{padding: 0, height: pressableItemSize()}}>
        <Title style={{fontSize: navigationHeaderTitleFontSize()}}>{ this.context.translations.reset }</Title>
      </Button>
    )
  }

  render() {
    const { translations } = this.context;
    const mobileBodyPaddingLeft = isShortWidthScreen() ? wp('8%') : wp('4%');

    return (
      <NavigationHeader
        title={translations.filterScorecard}
        rightComponent={() => this.renderRightButton()}
        rightButtonStyle={{ alignSelf: 'center', maxWidth: wp('34%'), marginRight: -6 }}
        leftButtonStyle={{flex: getDeviceStyle(0.27, 0.20)}}
        bodyStyle={{flex: getDeviceStyle(2, 1), paddingLeft: getDeviceStyle(wp('1.5%'), mobileBodyPaddingLeft)}}
        onBackPress={() => this._onPress()}
      />
    )
  }
}

export default FilterScorecardHeader;