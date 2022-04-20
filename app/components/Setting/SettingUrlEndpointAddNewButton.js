import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Color from '../../themes/color';
import {LocalizationContext} from '../Translations';
import { bodyFontSize } from '../../utils/font_size_util';
import { getDeviceStyle } from '../../utils/responsive_util';

class SettingUrlEndpointAddNewButton  extends React.Component {
  static contextType = LocalizationContext

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onPress()} style={{padding: 10, flexDirection: 'row'}}>
        <Icon size={22} name='add-circle' style={{marginRight: 5, marginTop: 2}} color={Color.clickableColor} />
        <Text style={{fontSize: bodyFontSize(), color: Color.clickableColor, marginTop: getDeviceStyle(0, 2)}}>
          { this.context.translations.addNewUrlEndpoint }
        </Text>
      </TouchableOpacity>
    )
  }
}

export default SettingUrlEndpointAddNewButton;
