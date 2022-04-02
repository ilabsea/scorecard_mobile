import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import BottomSheetModalTitle from '../BottomSheetModalTitle';
import ParticipantModalListItem from './ParticipantModalListItem';
import ParticipantModalSubtitle from './ParticipantModalSubtitle';

import ProposedIndicator from '../../models/ProposedIndicator';
import Participant from '../../models/Participant';
import proposedIndicatorService from '../../services/proposed_indicator_service';
import { containerPadding, getDeviceStyle } from '../../utils/responsive_util';
import { isProposeByIndicatorBase } from '../../utils/proposed_indicator_util';
import { bodyFontSize } from '../../utils/font_size_util';
import { participantContentHeight } from '../../constants/modal_constant';
import { navigate } from '../../navigators/app_navigator';

class ParticipantModalContent extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      raisedParticipantUuids: [],
      isIndicatorBase: false,
    }
    this.participants = !!props.participants ? props.participants
                        : Participant.findByScorecard(props.scorecardUuid);
  }

  async componentDidMount() {
    this.setState({ isIndicatorBase: await isProposeByIndicatorBase()})

    if (this.state.isIndicatorBase) {
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

  selectedIcon(participant) {
    if (this.state.raisedParticipantUuids.filter(raisedParticipantUuid => raisedParticipantUuid == participant.uuid).length > 0)
      return <Icon name='check' size={getDeviceStyle(28, 23)} color={ Color.clickableColor } />

    return <View/>;
  }

  toggleParticipant(participant) {
    if (this.state.isIndicatorBase) {
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
    else {
      this.props.participantModalRef.current?.dismiss();
      navigate('CreateNewIndicator', {scorecard_uuid: this.props.scorecardUuid, participant_uuid: participant.uuid});
    }
  }

  renderParticipantList() {
    return this.participants.map((participant, index) => {
      return (
        <View key={index}>
          <ParticipantModalListItem
            participant={participant}
            onPress={() => this.toggleParticipant(participant) }
            rightIcon={this.selectedIcon(participant)}
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
            isIndicatorBase={this.state.isIndicatorBase}
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