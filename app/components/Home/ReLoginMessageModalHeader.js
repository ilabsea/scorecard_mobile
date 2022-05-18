import React from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import OutlineInfoIcon from '../OutlineInfoIcon';

import Color from '../../themes/color';
import CustomStyle from '../../themes/customStyle';

class ReLoginMessageModalHeader extends React.Component {
  static contextType = LocalizationContext;

  render() {
    return <View>
              <View style={{alignItems: 'center', marginBottom: 14}}>
                <OutlineInfoIcon color={Color.warningColor}
                  customIconContainerStyles={{width: 58, height: 58}}
                  customIconStyle={{fontSize: 38}}
                />
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={[CustomStyle.modalTitle, { marginBottom: 0 }]}>
                  { this.context.translations.reLoginRequired }
                </Text>
              </View>
            </View>
  }
}

export default ReLoginMessageModalHeader