import React, { Component } from 'react';
import { View } from 'react-native';

import { LocalizationContext } from '../Translations';
import CloseButton from '../CloseButton';
import SaveButton from '../SaveButton';
import { isBlank } from '../../utils/string_util';

class AddNewIndicatorModalButtons extends Component {
  static contextType = LocalizationContext;

  isValid = () => {
    if (isBlank(this.props.name) || this.props.isIndicatorExist)
      return false;

    return true;
  }

  render() {
    const { translations } = this.context;

    return (
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 126 }}>
        <CloseButton onPress={() => this.props.cancel()} label={translations.close} />
        { this.props.isUniqueIndicatorOrEditing &&
          <SaveButton
            onPress={() => this.props.save()}
            label={translations.save}
            disabled={!this.isValid()}
          />
        }
      </View>
    )
  }
}

export default AddNewIndicatorModalButtons;