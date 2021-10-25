import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Tip from '../Tip';
import OutlinedButton from '../OutlinedButton';
import { LocalizationContext } from '../Translations';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { getDeviceStyle } from '../../utils/responsive_util';
import IndicatorDevelopmentTabletStyles from '../../styles/tablet/IndicatorDevelopmentScreenStyle';
import IndicatorDevelopmentMobileStyles from '../../styles/mobile/IndicatorDevelopmentScreenStyle';

const responsiveStyles = getDeviceStyle(IndicatorDevelopmentTabletStyles, IndicatorDevelopmentMobileStyles);

class IndicatorDevelopmentContentHeader extends Component {
  static contextType = LocalizationContext;

  _renderBtnAddCriteria() {
    const { translations } = this.context;

    return (
      <OutlinedButton
        icon="plus"
        label={translations.addNew}
        onPress={() => this.props.openModal() }
      />
    )
  }

  render() {
    const { translations } = this.context;

    return (
      <React.Fragment>
        <Tip screenName={'IndicatorDevelopment'}/>

        <View style={[responsiveStyles.titleContainer, { marginBottom: 25 }]}>
          <Text style={[styles.h1, responsiveStyles.titleLabel]}>{ translations.indicatorDevelopment }</Text>

          { this.props.hasData && this._renderBtnAddCriteria() }
        </View>
      </React.Fragment>
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