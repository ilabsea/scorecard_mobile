import React from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import IndicatorSelectionItems from './IndicatorSelectionItems';

import { bodyFontSize } from '../../utils/font_size_util';

class ExistedIndicatorItem extends React.Component {
  static contextType = LocalizationContext;

  render() {
    if (this.props.indicatorName === '')
      return;

    const label = this.props.duplicatedIndicators.length > 0 ? this.context.translations.thisIndicatorIsAlreadySelected : this.context.translations.tapOnTheIndicatorBelowToSelect;

    return (
      <View>
        <Text style={{marginTop: 20, fontSize: bodyFontSize()}}>{ label }</Text>

        <IndicatorSelectionItems
          indicators={this.props.duplicatedIndicators}
          isSearching={false}
          scorecardUuid={this.props.scorecardUuid}
          participantUuid={this.props.participantUuid}
          customCardStyle={{ marginLeft: 0, width: '100%' }}
          updateIndicatorList={() => this.props.updateIndicatorList()}
        />
      </View>
    )
  }
}

export default ExistedIndicatorItem;