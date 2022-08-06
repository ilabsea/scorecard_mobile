import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
      'female': translations.femaleAbbreviation,
      'disability': translations.disabilityAbbreviation,
      'minority': translations.minorityAbbreviation,
      'poor': translations.poorAbbreviation,
      'youth': translations.youthAbbreviation
    }

    let doms = [];
    for (let type in participantTypes ) {
      doms.push(<Text key={uuidv4()} style={styles.text}>
                  { labels[type] }: { participantTypes[type] }{ type != 'youth' && ', ' }
                </Text>)
    }

    return <View style={[styles.container, this.props.containerStyle]}>{ doms }</View>
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 0
  },
  text: {
    fontSize: 13,
    color: Color.subText,
  }
});

export default IndicatorRaisedParticipants

// How to use this component
{/* <IndicatorRaisedParticipants
  scorecardUuid={scorecardUuid}
  indicatorableId={indicatorableId} /> */}