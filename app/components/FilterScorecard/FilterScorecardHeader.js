import React, {Component} from 'react';

import { Header, Title, Left, Right, Body, Button } from "native-base";
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { HeaderBackButton } from '@react-navigation/stack';
import AppIcon from 'react-native-vector-icons/FontAwesome';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import { getDeviceStyle, mobileHeadingTitleSize } from '../../utils/responsive_util';

class FilterScorecardHeader extends Component {
  static contextType = LocalizationContext;
  
  _onPress() {
    !!this.props.onBackPress && this.props.onBackPress()
  }

  render() {
    const { translations } = this.context;

    return (
      <Header style={{alignItems: 'center'}}>
        <Left>
          <HeaderBackButton tintColor={Color.whiteColor} onPress={() => this._onPress()} style={{ marginLeft: getDeviceStyle(11, 0) }} />
        </Left>

        <Body style={{flex: 2}}>
          <Title style={{fontSize: getDeviceStyle(19, mobileHeadingTitleSize())}}>{ translations.filterScorecard }</Title>
        </Body>

        <Right>
          <Button transparent onPress={() => this.props.resetFilter()}>
            <AppIcon name='undo' size={20} color={Color.whiteColor} style={{padding: 16, borderWidth: 0, paddingRight: 0}} />
          </Button>
        </Right>
      </Header>
    )
  }
}

export default FilterScorecardHeader;