import React, {Component} from 'react';
import { Title, Button } from "native-base";
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { LocalizationContext } from '../Translations';
import NavigationHeader from '../NavigationHeader';
import { getDeviceStyle, mobileHeadingTitleSize } from '../../utils/responsive_util';

class FilterScorecardHeader extends Component {
  static contextType = LocalizationContext;
  
  _onPress() {
    !!this.props.onBackPress && this.props.onBackPress()
  }

  renderRightButton() {
    return (
      <Button transparent onPress={() => this.props.resetFilter()} style={{padding: 0}}>
        <Title style={{fontSize: getDeviceStyle(19, mobileHeadingTitleSize())}}>{ this.context.translations.reset }</Title>
      </Button>
    )
  }

  render() {
    const { translations } = this.context;

    return (
      <NavigationHeader
        title={translations.filterScorecard}
        bodyStyle={{flex: 1, paddingLeft: wp('2%')}}
        rightComponent={() => this.renderRightButton()}
        rightButtonStyle={{ maxWidth: wp('34%') }}
        onBackPress={() => this._onPress()}
      />
    )
  }
}

export default FilterScorecardHeader;