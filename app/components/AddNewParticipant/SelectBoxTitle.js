import React from 'react';
import { Text } from 'react-native';

import {LocalizationContext} from '../Translations';
import { bodyFontSize } from '../../utils/font_size_util';

class SelectBoxTitle extends React.Component {
  static contextType = LocalizationContext;
  render() {
    return <Text style={[{fontSize: bodyFontSize()}, this.props.labelStyle]}>
              { this.props.label }
              { this.props.disabled &&
                <Text style={{fontSize: bodyFontSize()}}> ({ this.context.translations.anonymousCannotChoose })</Text>
              }
           </Text>
  }
}

export default SelectBoxTitle;