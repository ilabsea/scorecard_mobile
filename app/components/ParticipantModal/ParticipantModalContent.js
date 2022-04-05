import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { LocalizationContext } from '../Translations';
import BottomSheetModalTitle from '../BottomSheetModalTitle';
import ParticipantModalListItem from './ParticipantModalListItem';
import ParticipantModalListItemRightIcon from './ParticipantModalListItemRightIcon';
import ParticipantModalSubtitle from './ParticipantModalSubtitle';

import ProposedIndicator from '../../models/ProposedIndicator';
import Participant from '../../models/Participant';
import proposedIndicatorService from '../../services/proposed_indicator_service';
import { containerPadding } from '../../utils/responsive_util';
import { bodyFontSize } from '../../utils/font_size_util';
import { isCreateNewIndicatorScreen } from '../../utils/screen_util';
import { participantContentHeight } from '../../constants/modal_constant';
import { navigate } from '../../navigators/app_navigator';

class ParticipantModalContent extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      raisedParticipantUuids: [],
    }
    this.participants = !!props.participants ? props.participants
                        : Participant.findByScorecard(props.scorecardUuid);
  }

  async componentDidMount() {
    if (this.props.isIndicatorBase && isCreateNewIndicatorScreen()) {
      const raisedParticipantUuids = [];
      this.participants.map(participant => {
        if (this.isParticipantRaised(participant.uuid))
          raisedParticipantUuids.push(participant.uuid);
      });
      this.setState({ raisedParticipantUuids });
    }
  }

  isParticipantRaised(participantUuid) {
    const { scorecardUuid, selectedIndicator } = this.props;
    return !!ProposedIndicator.findByParticipant(scorecardUuid, selectedIndicator.indicatorable_id, participantUuid);
  }

  listItemRightIcon(participant) {
    return <ParticipantModalListItemRightIcon participant={participant} raisedParticipantUuids={this.state.raisedParticipantUuids}
            isIndicatorBase={this.props.isIndicatorBase} />
  }

  toggleParticipant(participant) {
    if (!!this.props.selectParticipant) {
      this.props.participantModalRef.current?.dismiss();
      this.props.selectParticipant(participant);
    }
    else
      this.props.isIndicatorBase ? this.handleToggleParticipantOnIndicatorBase(participant)
                                 : this.handleToggleParticipantOnParticipantBase(participant);
  }

  handleToggleParticipantOnParticipantBase(participant) {
    this.props.participantModalRef.current?.dismiss();
    navigate('CreateNewIndicator', {scorecard_uuid: this.props.scorecardUuid, participant_uuid: participant.uuid});
  }

  handleToggleParticipantOnIndicatorBase(participant) {
    let newRaisedParticipantUuids = this.state.raisedParticipantUuids;
    if (this.isParticipantRaised(participant.uuid))
      newRaisedParticipantUuids =  this.state.raisedParticipantUuids.filter(raisedParticipantUuid => raisedParticipantUuid != participant.uuid);
    else
      newRaisedParticipantUuids.push(participant.uuid);

    this.setState({ raisedParticipantUuids: newRaisedParticipantUuids }, () => {
      proposedIndicatorService.handleCreateAndRemoveIndicator(this.props.scorecardUuid, this.props.selectedIndicator, participant.uuid);
      setTimeout(() => {
        !!this.props.updateIndicatorList && this.props.updateIndicatorList();
      }, 50);
    });
  }

  renderParticipantList() {
    return this.participants.map((participant, index) => {
      return (
        <View key={index}>
          <ParticipantModalListItem
            participant={participant}
            onPress={() => this.toggleParticipant(participant) }
            rightIcon={this.listItemRightIcon(participant)}
          />
        </View>
      )
    });
  }

  renderNoMessage() {
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: bodyFontSize()}}>{ this.context.translations.noParticipant }</Text>
           </View>
  }

  render() {
    return (
      <View style={{ height: hp(participantContentHeight) }}>
        <BottomSheetModalTitle title={ !!this.props.selectedIndicator ? this.props.selectedIndicator.name : this.context.translations.proposedIndicator } />

        <View style={{ padding: containerPadding, flex: 1 }}>
          <ParticipantModalSubtitle raisedParticipant={this.state.raisedParticipantUuids.length} totalParticipant={this.participants.length}
            showAddParticipantModal={() => this.props.showAddParticipantModal()}
            isIndicatorBase={this.props.isIndicatorBase}
          />

          <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
            { this.participants.length > 0 ? this.renderParticipantList() : this.renderNoMessage() }
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default ParticipantModalContent;