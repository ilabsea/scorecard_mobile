import React, {Component} from 'react';
import {View} from 'react-native';
import {Text} from 'native-base';

import {LocalizationContext} from '../Translations';
import ParticipantInfo from '../CreateNewIndicator/ParticipantInfo';
import Participant from '../../models/Participant';
import { navigate } from '../../navigators/app_navigator';
import { getDeviceStyle } from '../../utils/responsive_util';
import ProposedIndicatorTabletStyles from '../../styles/tablet/ProposedIndicatorComponentStyle';
import ProposedIndicatorMobileStyles from '../../styles/mobile/ProposedIndicatorComponentStyle';

const styles = getDeviceStyle(ProposedIndicatorTabletStyles, ProposedIndicatorMobileStyles);

class ProposedIndicatorNewProposeButton extends Component {
  static contextType = LocalizationContext;

  closeModal() {
    this.props.updateModalVisible(false)
    this.props.participantModalRef.current?.dismiss();
  }

  renderAnonymous() {
    const anonymous = Participant.getAnonymousByScorecard(this.props.scorecardUuid).length;
    if (anonymous > 0)
      return ` (${this.context.translations.anonymous} ${anonymous})`;
  }

  render() {
    const {translations} = this.context;
    const raisedParticipants = Participant.getProposedParticipants(this.props.scorecardUuid);
    return (
      <View style={styles.addNewButtonContainer}>
        <Text style={[styles.headingTitle, {flex: 1}]}>
          { translations.numberOfParticipant }: { Participant.getAllByScorecard(this.props.scorecardUuid).length } {translations.pax}
          {this.renderAnonymous()}
        </Text>

        { raisedParticipants.length > 0 &&
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <ParticipantInfo
              title={translations.proposeTheIndicator}
              participants={Participant.getNotRaised(this.props.scorecardUuid)}
              scorecardUuid={ this.props.scorecardUuid }
              buttonVisible={raisedParticipants.length > 0}
              mode={{type: 'button', label: translations.proposeNewIndicator, iconName: 'plus'}}
              selectParticipant={(participant) => navigate('CreateNewIndicator', {scorecard_uuid: this.props.scorecardUuid, participant_uuid: participant.uuid})}
              closeModal={() => this.closeModal()}
              participantModalRef={this.props.participantModalRef}
              formModalRef={this.props.formModalRef}
            />
          </View>
        }
      </View>
    )
  }
}

export default ProposedIndicatorNewProposeButton