import React from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../../Translations';
import { bodyFontSize } from '../../../utils/font_size_util';

class CustomAlertMessageMain extends React.Component {
  static contextType = LocalizationContext;

  renderText(text, marginTop = 0) {
    return <Text style={{ textAlign: 'center', fontSize: bodyFontSize(), marginTop: marginTop }}>{ text }</Text>
  }

  render() {
    const { appLanguage } = this.context;
    return (
      <View style={[{marginBottom: 10, marginTop: appLanguage == 'km' ? 20 : 15}, this.props.customStyle]}>
        { this.renderText(this.props.description) }

        { !!this.props.descriptionBottomSection && this.renderText(this.props.descriptionBottomSection, 12) }
      </View>
    )
  }
}

export default CustomAlertMessageMain;