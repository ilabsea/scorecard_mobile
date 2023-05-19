import React, { Component } from 'react';
import { View } from 'react-native';

import { LocalizationContext } from '../Translations';
import BottomSheetModalTitle from '../BottomSheetModalTitle';
import ScorecardResultModalSubTitle from './ScorecardResultModalSubTitle';

class ScorecardResultModalTitle extends Component {
  static contextType = LocalizationContext;

  renderIndicatorName() {
    if (this.props.selectedIndicator) {
      const indicatorName = this.props.selectedIndicator.content ? this.props.selectedIndicator.content : this.props.selectedIndicator.name;
      return `${this.props.indicator.order}. ${indicatorName}`;
    }

    return '';
  }

  render() {
    const { translations, appLanguage } = this.context;
    const fieldName = translations[this.props.indicator.currentFieldName] ? translations[this.props.indicator.currentFieldName].toLowerCase() : '';
    const subTitle = this.props.isScorecardFinished ? fieldName : `${translations.insert}${appLanguage == 'en' ? ' ' : ''}${fieldName}`;

    return (
      <View>
        <BottomSheetModalTitle title={this.renderIndicatorName()} />

        <ScorecardResultModalSubTitle
          subTitle={subTitle}
          isScorecardFinished={this.props.isScorecardFinished}
          addNewPoint={() => this.props.addNewPoint()}
        />
      </View>
    )
  }
}

export default ScorecardResultModalTitle;