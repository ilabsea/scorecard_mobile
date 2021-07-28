import React, { Component } from 'react';
import { View, Text } from 'react-native';

import {LocalizationContext} from '../Translations';
import Accordion from '../RaisingProposed/Accordion';

import { Criteria } from '../../services/criteria_service';
import uuidv4 from '../../utils/uuidv4';
import participantHelper from '../../helpers/participant_helper';

import { getDeviceStyle } from '../../utils/responsive_util';

import listItemStyles from '../../themes/participantListItemStyle';
import CriteriaAccordionMobileStyles from '../../styles/mobile/CriteriaAccordionComponentStyle';
import CriteriaAccordionTabletStyles from '../../styles/tablet/CriteriaAccordionComponentStyle';

const styles = getDeviceStyle(CriteriaAccordionTabletStyles, CriteriaAccordionMobileStyles);

let _this = null;

class CriteriaAccordion extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    _this = this;

    this.state = {
      criterias: [],
    }
  }

  componentDidMount() {
    const criterias = new Criteria(this.props.scorecardUuid).getCriterias();
    this.setState({ criterias })
  }

  renderTitleText(criteria) {
    const {translations} = _this.context;
    const participantOrderNumbers = participantHelper.getParticipantByIndicator(_this.props.scorecardUuid, criteria.indicatorable_id);

    return (
      <View style={styles.accordionItemContainer}>
        <Text numberOfLines={2} style={styles.titleLabel}>{ criteria.name }</Text>
        <Text style={styles.subTitleLabel}>
          { translations.formatString(translations.numberOfRaisedParticipant, participantOrderNumbers.length) }
        </Text>
      </View>
    )
  }

  renderAccordionContent(criteria) {
    const { translations } = _this.context;
    const participantOrderNumbers = participantHelper.getParticipantByIndicator(_this.props.scorecardUuid, criteria.indicatorable_id);

    return (
      <View style={styles.contentContainer}>
        <Text style={styles.contentTitleLabel}>{ translations.noOfParticipant }:</Text>

        <View style={{flex: 1, marginTop: 2, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end'}}>
          { _this.renderParticipantOrderNumbers(participantOrderNumbers) }
        </View>
      </View>
    )
  }

  renderParticipantOrderNumbers(participantOrderNumbers) {
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
      <Accordion
        items={this.state.criterias}
        accordionTitle={this.renderTitleText}
        accordionContent={this.renderAccordionContent}
      />
    )
  }
}

export default CriteriaAccordion;