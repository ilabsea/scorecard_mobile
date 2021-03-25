import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

import {LocalizationContext} from '../Translations';

import { getDeviceStyle } from '../../utils/responsive_util';
import ButtonForgetCodeTabletStyles from './styles/tablet/ButtonForgetCodeStyle';
import ButtonForgetCodeMobileStyles from './styles/mobile/ButtonForgetCodeStyle';

const responsiveStyles = getDeviceStyle(ButtonForgetCodeTabletStyles, ButtonForgetCodeMobileStyles);

class ButtonForgetCode extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;

    return (
      <View style={responsiveStyles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Contact')}
          style={responsiveStyles.button}>

          <Text style={[{color: '#fff'}, responsiveStyles.label]}>{translations.clickHereIfForgetCode}</Text>
          <Icon name={'chevron-forward'} style={responsiveStyles.icon}/>
        </TouchableOpacity>
      </View>
    )
  }
}

export default ButtonForgetCode;