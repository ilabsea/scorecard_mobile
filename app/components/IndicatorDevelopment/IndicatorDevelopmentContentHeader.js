import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Color from '../../themes/color';
import Tip from '../Share/Tip';
import OutlinedButton from '../OutlinedButton';
import { LocalizationContext } from '../Translations';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';
import IndicatorDevelopmentTabletStyles from '../../styles/tablet/IndicatorDevelopmentScreenStyle';
import IndicatorDevelopmentMobileStyles from '../../styles/mobile/IndicatorDevelopmentScreenStyle';

const responsiveStyles = getDeviceStyle(IndicatorDevelopmentTabletStyles, IndicatorDevelopmentMobileStyles);

class IndicatorDevelopmentContentHeader extends Component {
  static contextType = LocalizationContext;

  _renderBtnAddIndicator() {
    const buttonColor = this.props.hasRating ? Color.disabledBtnBg : Color.clickableColor;

    return (
      <OutlinedButton
        icon="plus"
        label={this.context.translations.addNew}
        onPress={() => this.props.openModal() }
        disabled={this.props.hasRating}
        buttonColor={{color: buttonColor}}
      />
    )
  }

  render() {
    return (
      <View style={{paddingTop: containerPadding, paddingBottom: getDeviceStyle(6, 0), backgroundColor: Color.defaultBgColor}}>
        <Tip screenName='IndicatorDevelopment' showTipModal={() => this.props.tipModalRef.current?.present()} />

        <View style={responsiveStyles.titleContainer}>
          <Text style={[styles.h1, responsiveStyles.titleLabel]}>{ this.context.translations.indicatorDevelopment }</Text>

          {  this.props.hasData && this._renderBtnAddIndicator() }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    fontFamily: FontFamily.title,
    marginBottom: 20
  },
})

export default IndicatorDevelopmentContentHeader;