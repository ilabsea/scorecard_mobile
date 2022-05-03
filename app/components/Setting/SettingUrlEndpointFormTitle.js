import React from 'react';
import { View, Text } from 'react-native';

import {LocalizationContext} from '../Translations';
import Color from '../../themes/color';
import styles from '../../themes/modalStyle';
import { bodyFontSize, smallTextFontSize } from '../../utils/font_size_util';
import { containerPadding } from '../../utils/responsive_util';

class SettingUrlEndpointFormTitle extends React.Component {
  static contextType = LocalizationContext;

  render() {
    return (
      <View style={{ padding: containerPadding, paddingBottom: 5}}>
        <Text style={[styles.title, { fontSize: bodyFontSize() }]}>{ this.context.translations.pleaseEnterInformationBelow }</Text>

        { !this.props.isAllowToDeleteOrEdit &&
          <Text style={{ fontSize: smallTextFontSize(), color: Color.redColor, marginTop: -10 }}>
            { this.context.translations.cannotEditOrDeleteThisUrlEndpoint }
          </Text>
        }
      </View>
    )
  }
}

export default SettingUrlEndpointFormTitle;