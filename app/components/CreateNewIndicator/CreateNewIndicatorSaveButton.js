import React, { Component } from 'react';
import { View } from 'react-native';

import { LocalizationContext } from '../Translations';
import BottomButton from '../BottomButton';
import { containerPadding } from '../../utils/responsive_util';

class CreateNewIndicatorSaveButton extends Component {
  static contextType = LocalizationContext;

  render() {
    if (this.props.isSearching || this.props.isEdit)
      return <View/>;

    return (
      <View style={{padding: containerPadding, paddingHorizontal: 0}}>
        <BottomButton disabled={!this.props.isValid}
          label={this.context.translations['saveAndGoNext']}
          onPress={() => this.props.save()}
        />
      </View>
    )
  }
}

export default CreateNewIndicatorSaveButton;