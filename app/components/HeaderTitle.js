import React, {Component} from 'react';
import {View, Text} from 'react-native';

import {LocalizationContext} from '../components/Translations';

import { getDeviceStyle } from '../utils/responsive_util';

import HeaderTitleTabletStyles from '../styles/tablet/HeaderTitleComponentStyle';
import HeaderTitleMobileStyles from '../styles/mobile/HeaderTitleComponentStyle';

const styles = getDeviceStyle(HeaderTitleTabletStyles, HeaderTitleMobileStyles);
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
        <Text style={styles.subTitle}>{translations[subheading]}</Text>
      </View>
    );
  }
}

export default HeaderTitle;
