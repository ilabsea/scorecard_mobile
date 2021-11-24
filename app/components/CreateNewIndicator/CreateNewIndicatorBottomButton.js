import React, { Component } from 'react';
import { View } from 'react-native';

import { LocalizationContext } from '../Translations';
import BottomButton from '../BottomButton';
import { containerPadding } from '../../utils/responsive_util';
import IndicatorService from '../../services/indicator_service';

class CreateNewIndicatorBottomButton extends Component {
  static contextType = LocalizationContext;

  done() {
    if (this.props.isSearching) {
      const allIndicator = new IndicatorService().getIndicatorList(this.props.scorecardUuid, '', this.props.selectedIndicators);
      this.props.stopSearching();
      this.props.updateSearchedIndicator(allIndicator.indicators, allIndicator.selectedIndicators);
    }
    else
      this.props.stopEditing();
  }

  render() {
    if (this.props.isSearching || this.props.isEdit) {
      return (
        <View style={{padding: containerPadding, paddingHorizontal: 0}}>
          <BottomButton disabled={!this.props.isValid}
            label='រួចរាល់'
            onPress={() => this.done()}
            iconName='none'
          />
        </View>
      )
    }

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