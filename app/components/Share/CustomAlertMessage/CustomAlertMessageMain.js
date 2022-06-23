import React from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../../Translations';
import { bodyFontSize } from '../../../utils/font_size_util';

class CustomAlertMessageMain extends React.Component {
  static contextType = LocalizationContext;

  render() {
    const { appLanguage } = this.context;
    return (
      <View style={{marginBottom: 10, marginTop: appLanguage == 'km' ? 20 : 15}}>
        <Text style={{ textAlign: 'center', fontSize: bodyFontSize() }}>
          { this.props.description }
        </Text>
      </View>
    )
  }
}

export default CustomAlertMessageMain;