import React from 'react';
import { Text } from 'react-native';

import {LocalizationContext} from '../Translations';
import { bodyFontSize } from '../../utils/font_size_util';
import { FontFamily } from '../../assets/stylesheets/theme/font';

class SelectBoxTitle extends React.Component {
  static contextType = LocalizationContext;
  render() {
    return <Text style={[{fontSize: bodyFontSize(), fontFamily: FontFamily.body}, this.props.labelStyle]}>
              { this.props.label }
              { this.props.disabled &&
                <Text style={{fontSize: bodyFontSize(), fontFamily: FontFamily.body}}> ({ this.context.translations.anonymousCannotChoose })</Text>
              }
           </Text>
  }
}

export default SelectBoxTitle;