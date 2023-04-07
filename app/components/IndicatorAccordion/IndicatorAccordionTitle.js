import React, { Component } from 'react';
import { View, Text } from 'react-native';

import {LocalizationContext} from '../Translations';
import ProposedIndicatorParticipant from '../Share/ProposedIndicatorParticipant';
import { getDeviceStyle } from '../../utils/responsive_util';

import IndicatorAccordionMobileStyles from '../../styles/mobile/IndicatorAccordionComponentStyle';
import IndicatorAccordionTabletStyles from '../../styles/tablet/IndicatorAccordionComponentStyle';

const styles = getDeviceStyle(IndicatorAccordionTabletStyles, IndicatorAccordionMobileStyles);

class IndicatorAccordionTitle extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;

    return (
      <View style={styles.accordionItemContainer}>
        <Text numberOfLines={2} style={styles.titleLabel}>{ this.props.indicator.name }</Text>
        <ProposedIndicatorParticipant
          scorecardUuid={this.props.scorecardUuid}
          indicator={this.props.indicator}
          participantUuid={this.props.participantUuid}
          label={translations.proposedParticipantAccordionTitle}
          labelStyle={styles.subTitleLabel}
          numberStyle={styles.subTitleLabel}
        />
      </View>
    )
  }
}

export default IndicatorAccordionTitle;