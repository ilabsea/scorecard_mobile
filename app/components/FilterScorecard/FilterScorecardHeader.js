import React, {Component} from 'react';
import { Header, Title, Left, Right, Body, Button } from "native-base";
import { HeaderBackButton } from '@react-navigation/stack';

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

        <Button transparent onPress={() => this.props.resetFilter()} style={{borderWidth: 1, padding: 0}}>
          <Title style={{fontSize: getDeviceStyle(19, mobileHeadingTitleSize())}}>{ translations.reset }</Title>
        </Button>
      </Header>
    )
  }
}

export default FilterScorecardHeader;