import React from 'react';
import { View, Text } from 'react-native';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import OutlineInfoIcon from '../OutlineInfoIcon';
import { getDeviceStyle } from '../../utils/responsive_util';
import PopupModalTabletStyles from '../../styles/tablet/PopupModalComponentStyle';
import PopupModalMobileStyles from '../../styles/mobile/PopupModalComponentStyle';

const responsiveStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

class ErrorAuthenticationContentHeader extends React.Component {
  static contextType = LocalizationContext;

  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <OutlineInfoIcon color={Color.warningColor} />

        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={{marginTop: 0, flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text style={[{ marginBottom: 15 }, responsiveStyles.label]}>
              {this.context.translations.invalidEmailOrPasswordForServer}: <Text style={{color: 'blue'}}>{this.props.backendUrl}</Text>.
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

export default ErrorAuthenticationContentHeader;