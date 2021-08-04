import React, { Component } from 'react';
import { View, Text } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {LocalizationContext} from '../Translations';
import participantHelper from '../../helpers/participant_helper';

import Color from '../../themes/color';
import listItemStyles from '../../themes/participantListItemStyle';
import { getDeviceStyle } from '../../utils/responsive_util';
import ParticipantAccordionMobileStyles from '../../styles/mobile/ParticipantAccordionComponentStyle';
import ParticipantAccordionTabletStyles from '../../styles/tablet/ParticipantAccordionComponentStyle';

const styles = getDeviceStyle(ParticipantAccordionTabletStyles, ParticipantAccordionMobileStyles);

class ParticipantAccordionTitle extends Component {
  static contextType = LocalizationContext;

  renderOrderNumber(order) {
    return (
      <View style={[listItemStyles.numberContainer, { marginTop: 1 }]}>
        <Text style={listItemStyles.numberLabel}>{order}</Text>
      </View>
    )
  }

  renderGender(gender) {
    return (
      <View style={styles.genderIconContainer}>
        <FontAwesomeIcon name={participantHelper.getGenderIconLabel(gender)} size={20} color={Color.blackColor} />
      </View>
    )
  }

  renderBooleanData(data, fieldName) {
    return !!data ? `${this.context.translations[fieldName]}  ` : '';
  }

  getParticipantInfo() {
    const fields = ['disability', 'minority', 'poor', 'youth'];
    let info = '';
    fields.map(type => {
      info += this.renderBooleanData(this.props.participant[type], type);
    });

    return info;
  }

  render() {
    return (
      <View style={styles.accordionItemContainer}>
        { this.renderOrderNumber(this.props.participant.order + 1) }
        { this.renderGender(this.props.participant.gender) }
        <Text style={styles.titleText}>{ this.props.participant.age }{this.context.translations.yr}</Text>
        <Text style={[styles.titleText, { flex: 1, marginLeft: 0}]} numberOfLines={1}>
          { this.getParticipantInfo() }
        </Text>
      </View>
    )
  }
}

export default ParticipantAccordionTitle;