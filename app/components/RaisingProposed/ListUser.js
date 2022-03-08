import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'native-base';

import {LocalizationContext} from '../Translations';
import ProposedIndicatorAccordions from './ProposedIndicatorAccordions';

import { connect } from 'react-redux';
import { FontFamily } from '../../assets/stylesheets/theme/font';

import ParticipantInfo from '../CreateNewIndicator/ParticipantInfo';
import Participant from '../../models/Participant';
import { getRaisedParticipants } from '../../services/participant_service';
import { navigate } from '../../navigators/app_navigator';

import { getDeviceStyle } from '../../utils/responsive_util';
import RaisingProposedTabletStyles from '../../styles/tablet/RaisingProposedComponentStyle';
import RaisingProposedMobileStyles from '../../styles/mobile/RaisingProposedComponentStyle';

const responsiveStyles = getDeviceStyle(RaisingProposedTabletStyles, RaisingProposedMobileStyles);

class ListUser extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.state = {
      visibleModal: false,
    }
  }

  _goToCreateNewIndicator(participant_uuid) {
    navigate('CreateNewIndicator', {scorecard_uuid: this.props.scorecardUuid, participant_uuid: participant_uuid});
  }

  closeModal() {
    this.props.updateModalVisible(false)
    this.props.participantModalRef.current?.dismiss();
  }

  render() {
    const {translations} = this.context;
    const raisedParticipants = getRaisedParticipants(this.props.scorecardUuid);

    return (
      <View>
        <View style={styles.headingContainer}>
          <Text style={[styles.headingTitle, responsiveStyles.headingTitle]}>
            { translations.numberOfParticipant }: { this.props.numberOfParticipant } {translations.pax}
          </Text>

          <View style={{flexGrow: 1, alignItems: 'flex-end'}}>
            <ParticipantInfo
              participants={Participant.getNotRaised(this.props.scorecardUuid)}
              scorecardUuid={ this.props.scorecardUuid }
              buttonVisible={raisedParticipants.length > 0}
              mode={{type: 'button', label: translations.proposeNewIndicator, iconName: 'plus'}}
              onPressItem={(participant) => this._goToCreateNewIndicator(participant.uuid)}
              onPressCreateParticipant={(participant) => this._goToCreateNewIndicator(participant.uuid)}
              visibleModal={this.props.visibleModal}
              closeModal={() => this.closeModal()}
              participantModalRef={this.props.participantModalRef}
              formModalRef={this.props.formModalRef}
            />
          </View>
        </View>

        <ProposedIndicatorAccordions
          scorecardUuid={this.props.scorecardUuid}
          raisedParticipants={raisedParticipants}
          numberOfProposedParticipant={this.props.numberOfProposedParticipant}
          showModal={() => this.props.updateModalVisible(true)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
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