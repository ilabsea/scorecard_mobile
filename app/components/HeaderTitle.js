import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { FontSize, FontFamily } from '../assets/stylesheets/theme/font';

import {LocalizationContext} from '../components/Translations';
import Color from '../themes/color';
import { getTitleFontSize, getSubTitleFontSize } from '../utils/responsive_util';
class HeaderTitle extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
  }

  render() {
    const {translations} = this.context;
    const {headline, subheading} = this.props;

    return (
      <View>
        <Text style={styles.headline}>{translations[headline]}</Text>
        <Text style={{fontSize: getSubTitleFontSize(), color: '#2e2e2e'}}>{translations[subheading]}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headline: {
    color: Color.primaryColor,
    fontSize: getTitleFontSize(),
    fontFamily: FontFamily.title
  },
});

export default HeaderTitle;
