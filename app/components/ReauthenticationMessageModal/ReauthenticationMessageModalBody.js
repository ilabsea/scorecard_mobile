import React from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { bodyFontSize } from '../../utils/font_size_util';


class ReauthenticationMessageModalBody extends React.Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;
    const appVersion = <Text style={{fontFamily: FontFamily.title, fontSize: bodyFontSize()}}>1.5.2</Text>;

    return <View style={{marginTop: 20, marginBottom: 10}}>
              <Text style={{ textAlign: 'center', fontSize: bodyFontSize() }}>
                { translations.formatString(translations.reauthenticationDescription, appVersion) }
              </Text>
            </View>
  }
}

export default ReauthenticationMessageModalBody;