import React, { Component } from 'react';
import { View, Text } from 'react-native';

import {LocalizationContext} from '../Translations';
import participantHelper from '../../helpers/participant_helper';
import { getDeviceStyle } from '../../utils/responsive_util';
import uuidv4 from '../../utils/uuidv4';

import listItemStyles from '../../themes/participantListItemStyle';
import CriteriaAccordionMobileStyles from '../../styles/mobile/CriteriaAccordionComponentStyle';
import CriteriaAccordionTabletStyles from '../../styles/tablet/CriteriaAccordionComponentStyle';

const styles = getDeviceStyle(CriteriaAccordionTabletStyles, CriteriaAccordionMobileStyles);

class CriteriaAccordionContent extends Component {
  static contextType = LocalizationContext;

  renderParticipantOrderNumbers() {
    const participantOrderNumbers = participantHelper.getParticipantByIndicator(this.props.scorecardUuid, this.props.criteria.indicatorable_id);

    return participantOrderNumbers.map(orderNumber => {
      return (
        <View key={uuidv4()} style={[listItemStyles.numberContainer, { marginLeft: 6, marginBottom: 10 }]}>
          <Text style={listItemStyles.numberLabel}>{ orderNumber }</Text>
        </View>
      )
    });
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.contentTitleLabel}>{ this.context.translations.noOfParticipant }:</Text>

        <View style={{flex: 1, marginTop: 2, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end'}}>
          { this.renderParticipantOrderNumbers() }
        </View>
      </View>
    )
  }
}

export default CriteriaAccordionContent;