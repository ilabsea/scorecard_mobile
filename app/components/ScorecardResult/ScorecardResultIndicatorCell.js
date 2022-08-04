import React from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import IndicatorRaisedParticipants from '../Share/IndicatorRaisedParticipants';
import { bodyFontSize } from '../../utils/font_size_util';

class ScorecardResultIndicatorCell extends React.Component {
  static contextType = LocalizationContext;

  render() {
    return <View style={{margin: 6}}>
              <Text style={{fontSize: bodyFontSize()}}>{this.props.order}. {this.props.indicatorName}</Text>
              <IndicatorRaisedParticipants scorecardUuid={this.props.scorecardUuid} indicatorableId={this.props.indicatorableId} />
           </View>
  }
}

export default ScorecardResultIndicatorCell;