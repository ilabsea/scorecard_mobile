import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {LocalizationContext} from '../Translations';

import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import ButtonForgetCodeTabletStyles from '../../styles/tablet/ButtonForgetCodeComponentStyle';
import ButtonForgetCodeMobileStyles from '../../styles/mobile/ButtonForgetCodeComponentStyle';

const responsiveStyles = getDeviceStyle(ButtonForgetCodeTabletStyles, ButtonForgetCodeMobileStyles);

class ButtonForgetCode extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;

    return (
      <View style={[responsiveStyles.container, this.props.hasErrorMsg ? responsiveStyles.containerMarginBottom : {}]}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Contact')}
          style={responsiveStyles.button}>

          <Text style={[{color: Color.whiteColor}, responsiveStyles.label]}>{translations.clickHereIfForgetCode}</Text>
          <Icon name='chevron-right' style={responsiveStyles.icon}/>
        </TouchableOpacity>
      </View>
    )
  }
}

export default ButtonForgetCode;
