import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import { Icon } from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {LocalizationContext} from '../Translations';
import Accordion from '../RaisingProposed/Accordion';
import Color from '../../themes/color';

import ProposedCriteria from '../../models/ProposedCriteria';
import { getRaisedParticipants } from '../../services/participant_service';
import participantHelper from '../../helpers/participant_helper';
import uuidv4 from '../../utils/uuidv4';
import { getDeviceStyle } from '../../utils/responsive_util';

import listItemStyles from '../../themes/participantListItemStyle';
import ParticipantAccordionMobileStyles from '../../styles/mobile/ParticipantAccordionComponentStyle';
import ParticipantAccordionTabletStyles from '../../styles/tablet/ParticipantAccordionComponentStyle';

const styles = getDeviceStyle(ParticipantAccordionTabletStyles, ParticipantAccordionMobileStyles);
let _this = null;

class ParticipantAccordion extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    _this = this;

    this.state = {
      participants: []
    }
  }

  componentDidMount() {
    const raisedParticipants = getRaisedParticipants(this.props.scorecardUuid);
    this.setState({ participants: raisedParticipants})
  }

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

  renderTitleText(participant) {
    const { translations } = _this.context;

    return (
      <View style={styles.accordionItemContainer}>
        { _this.renderOrderNumber(participant.order + 1) }
        { _this.renderGender(participant.gender) }
        <Text style={styles.titleText}>{ participant.age }{translations.yr}</Text>
        <Text style={[styles.titleText, { flex: 1, marginLeft: 0}]} numberOfLines={1}>
          { _this.getParticipantInfo(participant) }
        </Text>
      </View>
    )
  }

  getParticipantInfo(participant) {
    const fields = ['disability', 'minority', 'poor', 'youth'];
    let info = '';
    fields.map(type => {
      info += _this.renderBooleanData(participant[type], type);
    });

    return info;
  }

  renderCriterias(criterias) {
    return criterias.map((criteria, index) => {
      return (
        <View key={uuidv4()} style={{paddingLeft: 8}}>
          <Text numberOfLines={2} style={styles.itemValueText}>{ criteria.indicatorable_name }</Text>
          { index < criterias.length - 1 && <Divider style={{backgroundColor: '#b3b3b3', marginVertical: 8}}/> }
        </View>
      )
    });
  }

  editParticipant = (participantUuid) => {
    this.props.navigation.navigate('CreateNewIndicator', {scorecard_uuid: this.props.scorecardUuid, participant_uuid: participantUuid});
  }

  renderAccordionContent(participant) {
    const {translations} = _this.context;
    const criterias = ProposedCriteria.find(_this.props.scorecardUuid, participant.uuid);

    return (
      <View key={uuidv4()} style={{paddingHorizontal: 20, paddingVertical: 10, backgroundColor: Color.accordionContentBgColor}}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 20}}>
          <Text style={styles.itemTitleText}>{translations.indicatorDevelopment}</Text>
          <TouchableOpacity onPress={() => _this.editParticipant(participant.uuid)} style={{flexDirection: 'row'}}>
            <Icon name={'pen'} type="FontAwesome5" style={styles.btnEditIcon}/>
            <Text style={styles.editButton}>{translations.edit}</Text>
          </TouchableOpacity>
        </View>

        {_this.renderCriterias(criterias)}
      </View>
    )
  }

  render() {
    return (
      <Accordion
        items={this.state.participants}
        accordionTitle={this.renderTitleText}
        accordionContent={this.renderAccordionContent}
      />
    )
  }
}

export default ParticipantAccordion;