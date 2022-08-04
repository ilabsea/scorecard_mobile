import React from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import Color from '../../themes/color';
import uuidv4 from '../../utils/uuidv4';
import proposedIndicatorHelper from '../../helpers/proposed_indicator_helper';

class IndicatorRaisedParticipants extends React.Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;
    const participantTypes = proposedIndicatorHelper.getRaisedParticipantSummary(this.props.scorecardUuid, this.props.indicatorableId)
    const labels = {
      'female': translations.shortcutFemale,
      'disability': translations.shortcutDisability,
      'minority': translations.shortcutMinority,
      'poor': translations.shortcutPoor,
      'youth': translations.shortcutYouth
    }

    let doms = [];
    for (let type in participantTypes ) {
      doms.push(<Text key={uuidv4()} style={{ fontSize: 13, color: Color.subText, lineHeight: 20 }}>
                  { labels[type] }: { participantTypes[type] }{ type != 'youth' && ', ' }
                </Text>)
    }

    return <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 0}}>{ doms }</View>
  }
}

export default IndicatorRaisedParticipants