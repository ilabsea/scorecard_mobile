import React, { Component } from 'react';
import { LocalizationContext } from '../../components/Translations';

import {
  View,
  Image,
  Text,
} from "react-native";

import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import LogosTabletStyles from '../../styles/tablet/LogosComponentStyle';
import LogosMobileStyles from '../../styles/mobile/LogosComponentStyle';

const responsiveStyles = getDeviceStyle(LogosTabletStyles, LogosMobileStyles);

export default class Logos extends Component {
  static contextType = LocalizationContext;

  buildLogo(logo, index) {
    let height = responsiveStyles.partnerLogoHeight;
    let width = (logo.width * height)/logo.height;

    return (
      <View style={{backgroundColor: Color.whiteColor, borderRadius: 30, padding: 8, marginHorizontal: 10}} key={index}>
        <Image source={logo.source} style={[{width: width, height: height}, logo.style]}/>
      </View>
    )
  }

  renderLogos() {
    const { translations } = this.context;

    let logos = [
      { source: require('../../assets/images/home/care.png'), width: 596, height: 220, style: {}},
      { source: require('../../assets/images/home/api.png'), width: 308, height: 252, style: {marginHorizontal: 10, marginTop: -1}},
      { source: require('../../assets/images/home/instedd.png'), width: 744, height: 224, style: {}},
    ]

    return (
      <View style={{flexGrow:1, justifyContent: 'flex-end', padding: 20, alignItems: 'center'}}>
        <Text style={[{color: Color.whiteColor}, responsiveStyles.label]}>{translations.fundedBy}</Text>
        <Image source={require('../../assets/images/home/eu.png')} style={responsiveStyles.euLogo}/>

        <Text style={[{color: Color.whiteColor}, responsiveStyles.label]}>{translations.implementedBy}</Text>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          { logos.map((logo, index) => this.buildLogo(logo, index)) }
        </View>
      </View>
    );
  }

  render() {
    return (
      this.renderLogos()
    );
  }
}
