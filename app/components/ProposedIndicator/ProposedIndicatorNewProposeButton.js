import React, {Component} from 'react';
import {View, Text} from 'react-native';

import {LocalizationContext} from '../Translations';
import PressableParticipantInfo from '../Share/PressableParticipantInfo';
import Participant from '../../models/Participant';
import { navigate } from '../../navigators/app_navigator';
import proposedIndicatorStyleHelper from '../../helpers/proposed_indicator_style_helper';
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
      return ` (${getDeviceStyle(this.context.translations.anon, this.context.translations.anonymous)} ${anonymous})`;
  }

  render() {
    const {translations, appLanguage} = this.context;
    const raisedParticipants = Participant.getRaisedParticipants(this.props.scorecardUuid);
    return (
      <View style={styles.addNewButtonContainer}>
        <Text style={[styles.headingTitle, {flex: 1, textAlignVertical: 'center', height: '100%'}]}>
          { translations.numberOfParticipant }: { Participant.getAllByScorecard(this.props.scorecardUuid).length } {translations.pax}
          {this.renderAnonymous()}
        </Text>

        { raisedParticipants.length > 0 &&
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <PressableParticipantInfo
              title={translations.proposeTheIndicator}
              participants={Participant.getNotRaised(this.props.scorecardUuid)}
              scorecardUuid={ this.props.scorecardUuid }
              buttonVisible={raisedParticipants.length > 0}
              mode={{type: 'button', label: translations.newIndicator, iconName: 'add-outline'}}
              selectParticipant={(participant) => navigate('ProposeNewIndicator', {scorecard_uuid: this.props.scorecardUuid, participant_uuid: participant.uuid})}
              closeModal={() => this.closeModal()}
              participantModalRef={this.props.participantModalRef}
              formModalRef={this.props.formModalRef}
              buttonStyle={proposedIndicatorStyleHelper.getAddNewProposeButtonStyles(appLanguage, 'button')}
              buttonLabelStyle={proposedIndicatorStyleHelper.getAddNewProposeButtonStyles(appLanguage, 'label')}
            />
          </View>
        }
      </View>
    )
  }
}

export default ProposedIndicatorNewProposeButton