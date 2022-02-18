import React from 'react';
import { Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import { titleFontSize } from '../../utils/font_size_util';
import { FontFamily } from '../../assets/stylesheets/theme/font';

class AddNewIndicatorModalTitle extends React.Component {
  static contextType = LocalizationContext;

  render() {
    const {translations} = this.context;

    return (
      <Text style={{ fontSize: titleFontSize(), fontFamily: FontFamily.title, marginBottom: 20 }}>
        { this.props.isEdit ? translations.editIndicator : translations.addNewIndicator }
      </Text>
    )
  }
}

export default AddNewIndicatorModalTitle;