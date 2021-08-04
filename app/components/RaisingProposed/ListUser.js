import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'native-base';

import {LocalizationContext} from '../Translations';
import AccordionSwitcher from '../AccordionSwitcher/AccordionSwitcher';
import ParticipantAccordion from '../ParticipantAccordion/ParticipantAccordion';
import CriteriaAccordion from '../CriteriaAccordion/CriteriaAccordion';

import { connect } from 'react-redux';
import { FontFamily } from '../../assets/stylesheets/theme/font';

import ParticipantInfo from '../CreateNewIndicator/ParticipantInfo';
import Participant from '../../models/Participant';
import { ACCORDION_LEFT, ACCORDION_RIGHT } from '../../constants/main_constant';

import { getDeviceStyle } from '../../utils/responsive_util';
import RaisingProposedTabletStyles from '../../styles/tablet/RaisingProposedComponentStyle';
import RaisingProposedMobileStyles from '../../styles/mobile/RaisingProposedComponentStyle';

const responsiveStyles = getDeviceStyle(RaisingProposedTabletStyles, RaisingProposedMobileStyles);

class ListUser extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.state = {
      accordionType: 'participant'
    }
  }

  _goToCreateNewIndicator(participant_uuid) {
    this.props.navigation.navigate('CreateNewIndicator', {scorecard_uuid: this.props.scorecardUUID, participant_uuid: participant_uuid});
  }

  renderAccordionSwitcher() {
    const { translations } =  this.context;
    const activeSide = this.state.accordionType == 'criteria' ? ACCORDION_RIGHT : ACCORDION_LEFT;

    return (
      <AccordionSwitcher
        scorecardUuid={this.props.scorecardUUID}
        leftLabel={ translations.raisedParticipant }
        rightLabel={ translations.raisedCriteria }
        activeSide={activeSide}
        onPressLeft={() => this.setState({ accordionType: 'participant' })}
        onPressRight={() => this.setState({ accordionType: 'criteria' })}
        numberOfProposedParticipant={this.props.numberOfProposedParticipant}
      />
    )
  }

  render() {
    const {translations} = this.context;

    return (
      <View>
        <View style={styles.headingContainer}>
          <Text style={[styles.headingTitle, responsiveStyles.headingTitle]}>
            { translations.numberOfParticipant }: { this.props.numberOfParticipant } {translations.pax}
          </Text>

          <View style={{flexGrow: 1, alignItems: 'flex-end'}}>
            <ParticipantInfo
              participants={Participant.getNotRaised(this.props.scorecardUUID)}
              scorecard_uuid={ this.props.scorecardUUID }
              mode={{type: 'button', label: translations.proposeNewCriteria, iconName: 'plus'}}
              onPressItem={(participant) => this._goToCreateNewIndicator(participant.uuid)}
              onPressCreateParticipant={(participant) => this._goToCreateNewIndicator(participant.uuid)}
              navigation={this.props.navigation}/>
          </View>
        </View>

        { this.renderAccordionSwitcher() }

        { this.state.accordionType == 'participant' ?
          <ParticipantAccordion scorecardUuid={this.props.scorecardUUID} navigation={this.props.navigation} />
          :
          <CriteriaAccordion scorecardUuid={this.props.scorecardUUID} />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  headingTitle: {
    fontSize: 20,
    fontFamily: FontFamily.title,
    color: '#22354c',
  },
});

function mapStateToProps(state) {
  return {participants: state.participantReducer.participants};
}

export default connect(mapStateToProps, null)(ListUser);