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
      const indicatorDataset = new IndicatorService().getIndicatorList(this.props.scorecardUuid, '', this.props.selectedIndicators);
      this.props.stopSearching();
      this.props.updateSearchedIndicator(indicatorDataset);
    }
    else
      this.props.stopEditing();
  }

  onPress() {
    if (this.props.isSearching || this.props.isEdit)
      this.done();
    else
      this.props.save();
  }

  render() {
    let iconName = '';
    let label = this.context.translations.saveAndGoNext;

    if (this.props.isSearching || this.props.isEdit) {
      iconName = 'none';
      label = this.context.translations.done;
    }

    return (
      <View style={{padding: containerPadding, paddingHorizontal: 0}}>
        <BottomButton disabled={!this.props.isValid}
          label={label}
          onPress={() => this.onPress()}
          iconName={iconName}
        />
      </View>
    )
  }
}

export default CreateNewIndicatorBottomButton;