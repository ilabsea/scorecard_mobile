import React, {Component} from 'react';
import { View, Text } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { FontFamily } from '../../assets/stylesheets/theme/font';
import { LocalizationContext } from '../Translations';
import NavigationHeader from '../NavigationHeader';
import ScorecardProgressCircle from './ScorecardProgressCircle';

import { getDeviceStyle } from '../../utils/responsive_util';

class ScorecardProgressHeader extends Component {
  static contextType = LocalizationContext;

  _onPress() {
    !!this.props.onBackPress && this.props.onBackPress()
  }

  render() {
    const { translations } = this.context;

    return (
      <React.Fragment>
        <NavigationHeader
          title={translations.scorecardDetail}
          rightComponent={() => <ScorecardProgressCircle progressIndex={this.props.progressIndex}/>}
          onBackPress={() => this._onPress()}
          bodyStyle={{paddingLeft: wp('5%')}}
          titleStyle={{fontFamily: FontFamily.title}}
        />
      </React.Fragment>
    )
  }
}

export default ScorecardProgressHeader;