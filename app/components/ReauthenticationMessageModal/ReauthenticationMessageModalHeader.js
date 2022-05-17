import React from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import OutlineInfoIcon from '../OutlineInfoIcon';

import Color from '../../themes/color';
import CustomStyle from '../../themes/customStyle';

class ReauthenticationMessageModalHeader extends React.Component {
  static contextType = LocalizationContext;

  render() {
    return <View style={{flexDirection: 'row'}}>
              <OutlineInfoIcon color={Color.warningColor} />
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={[CustomStyle.modalTitle, { marginBottom: 0 }]}>
                  { this.context.translations.reauthenticationRequired }
                </Text>
              </View>
            </View>
  }
}

export default ReauthenticationMessageModalHeader