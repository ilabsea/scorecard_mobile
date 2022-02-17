import React, { Component } from 'react';
import { View } from 'react-native';

import { LocalizationContext } from '../Translations';
import BottomButton from '../BottomButton';
import { containerPadding } from '../../utils/responsive_util';

class CreateNewIndicatorBottomButton extends Component {
  static contextType = LocalizationContext;

  done() {
    if (this.props.isSearching) {
      this.props.stopSearching();
      this.props.updateIndicatorList();
    }
    else
      this.props.stopEditing();
  }

  renderDoneButton() {
    return (
      <View style={{padding: containerPadding, paddingHorizontal: 0}}>
        <BottomButton
          label={ this.context.translations.done }
          onPress={() => this.done()}
          iconName='none'
        />
      </View>
    )
  }

  render() {
    if (this.props.isSearching || this.props.isEdit)
      return this.renderDoneButton();

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

export default CreateNewIndicatorBottomButton;