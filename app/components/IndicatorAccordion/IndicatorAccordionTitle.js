import React, { Component } from 'react';
import { View, Text } from 'react-native';

import {LocalizationContext} from '../Translations';
import participantHelper from '../../helpers/participant_helper';
import { getDeviceStyle } from '../../utils/responsive_util';

import IndicatorAccordionMobileStyles from '../../styles/mobile/IndicatorAccordionComponentStyle';
import IndicatorAccordionTabletStyles from '../../styles/tablet/IndicatorAccordionComponentStyle';

const styles = getDeviceStyle(IndicatorAccordionTabletStyles, IndicatorAccordionMobileStyles);

class IndicatorAccordionTitle extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;
    const participantOrderNumbers = participantHelper.getParticipantByIndicator(this.props.scorecardUuid, this.props.indicator.indicatorable_id);

    return (
      <View style={styles.accordionItemContainer}>
        <Text numberOfLines={2} style={styles.titleLabel}>{ this.props.indicator.name }</Text>
        <Text style={styles.subTitleLabel}>
          { translations.formatString(translations.numberOfRaisedParticipant, participantOrderNumbers.length) }
        </Text>
      </View>
    )
  }
}

export default IndicatorAccordionTitle;