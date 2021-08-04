import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import { Icon } from 'native-base';

import {LocalizationContext} from '../Translations';

import Color from '../../themes/color';
import ProposedCriteria from '../../models/ProposedCriteria';
import uuidv4 from '../../utils/uuidv4';
import { getDeviceStyle } from '../../utils/responsive_util';
import ParticipantAccordionMobileStyles from '../../styles/mobile/ParticipantAccordionComponentStyle';
import ParticipantAccordionTabletStyles from '../../styles/tablet/ParticipantAccordionComponentStyle';

const styles = getDeviceStyle(ParticipantAccordionTabletStyles, ParticipantAccordionMobileStyles);

class ParticipantAccordionContent extends Component {
  static contextType = LocalizationContext;

  renderContentTitle() {
    const { translations } = this.context;

    return (
      <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 20}}>
        <Text style={styles.itemTitleText}>{translations.indicatorDevelopment}</Text>

        <TouchableOpacity onPress={() => this.editParticipant()} style={{flexDirection: 'row'}}>
          <Icon name={'pen'} type="FontAwesome5" style={styles.btnEditIcon}/>
          <Text style={styles.editButton}>{translations.edit}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderCriterias() {
    const criterias = ProposedCriteria.find(this.props.scorecardUuid, this.props.participantUuid);

    return criterias.map((criteria, index) => {
      return (
        <View key={uuidv4()} style={{paddingLeft: 8}}>
          <Text numberOfLines={2} style={styles.itemValueText}>{ criteria.indicatorable_name }</Text>
          { index < criterias.length - 1 && <Divider style={{backgroundColor: '#b3b3b3', marginVertical: 8}}/> }
        </View>
      )
    });
  }

  editParticipant() {
    this.props.navigation.navigate('CreateNewIndicator', {scorecard_uuid: this.props.scorecardUuid, participant_uuid: this.props.participantUuid});
  }

  render() {
    return (
      <View key={uuidv4()} style={{paddingHorizontal: 20, paddingVertical: 10, backgroundColor: Color.accordionContentBgColor}}>
        {this.renderContentTitle()}

        {this.renderCriterias()}
      </View>
    )
  }
}

export default ParticipantAccordionContent;