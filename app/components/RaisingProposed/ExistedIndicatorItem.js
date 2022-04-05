import React from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import IndicatorSelectionItems from './IndicatorSelectionItems';

import { bodyFontSize } from '../../utils/font_size_util';
import ProposedIndicator from '../../models/ProposedIndicator';

class ExistedIndicatorItem extends React.Component {
  static contextType = LocalizationContext;

  render() {
    if (this.props.indicatorName === '')
      return;

    const label = !!ProposedIndicator.findByParticipant(this.props.scorecardUuid, this.props.duplicatedIndicators[0].indicatorable_id, this.props.participantUuid)
                  ? this.context.translations.thisIndicatorIsAlreadySelected : this.context.translations.tapOnTheIndicatorBelowToSelect;

    return (
      <View>
        <Text style={{marginTop: 20, fontSize: bodyFontSize()}}>{ label }</Text>

        <IndicatorSelectionItems
          indicators={this.props.duplicatedIndicators}
          isSearching={false}
          scorecardUuid={this.props.scorecardUuid}
          participantUuid={this.props.participantUuid}
          isPopupModalList={true}
          customCardStyle={{ marginLeft: 0, width: '100%' }}
          isIndicatorBase={this.props.isIndicatorBase}
          isExistedIndicator={true}
          updateIndicatorList={() => this.props.updateIndicatorList()}
          formModalRef={this.props.formModalRef}
          participantModalRef={this.props.participantModalRef}
        />
      </View>
    )
  }
}

export default ExistedIndicatorItem;