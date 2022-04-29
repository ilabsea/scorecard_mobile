import React from 'react';
import { View, Text } from 'react-native';

import {LocalizationContext} from '../Translations';
import Color from '../../themes/color';
import styles from '../../themes/modalStyle';
import { bodyFontSize, smallTextFontSize } from '../../utils/font_size_util';
import { containerPadding } from '../../utils/responsive_util';
import endpointFormService from '../../services/endpoint_form_service';


class SettingUrlEndpointFormTitle extends React.Component {
  static contextType = LocalizationContext;

  render() {
    return (
      <View style={{ padding: containerPadding, paddingBottom: 5}}>
        <Text style={[styles.title, { fontSize: bodyFontSize() }]}>{ this.context.translations.pleaseEnterInformationBelow }</Text>

        { !endpointFormService.isAllowToDelete(this.props.editEndpoint, this.props.selectedEndpoint) &&
          <Text style={{ fontSize: smallTextFontSize(), color: Color.redColor, marginTop: -10 }}>{ this.context.translations.cannotDeleteThisUrlEndpoint }</Text>
        }
      </View>
    )
  }
}

export default SettingUrlEndpointFormTitle;