import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Color from '../../themes/color';
import BottomSheetModalTitle from '../BottomSheetModalTitle';
import ParticipantModalListItem from '../RaisingProposed/ParticipantModalListItem';

import ProposedIndicator from '../../models/ProposedIndicator';
import Participant from '../../models/Participant';
import { containerPadding } from '../../utils/responsive_util';
import proposedIndicatorService from '../../services/proposed_indicator_service';

class ProposedIndicatorParticipantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      raisedParticipantUuids: [],
    }
    this.participants = Participant.findByScorecard(props.scorecardUuid);
  }

  componentDidMount() {
    const raisedParticipantUuids = [];

    this.participants.map(participant => {
      if (this.isParticipantRaised(participant.uuid))
        raisedParticipantUuids.push(participant.uuid);
    });
    this.setState({ raisedParticipantUuids });
  }

  isParticipantRaised(participantUuid) {
    const { scorecardUuid, selectedIndicator } = this.props;
    return !!ProposedIndicator.findByParticipant(scorecardUuid, selectedIndicator.indicatorable_id, participantUuid);
  }

  selectedIcon(participant) {
    if (this.state.raisedParticipantUuids.filter(raisedParticipantUuid => raisedParticipantUuid == participant.uuid).length > 0)
      return <Icon name='check' size={28} color={ Color.clickableColor } />

    return <View/>;
  }

  toggleParticipant(participant) {
    let newRaisedParticipantUuids = this.state.raisedParticipantUuids;
    if (this.isParticipantRaised(participant.uuid))
      newRaisedParticipantUuids =  this.state.raisedParticipantUuids.filter(raisedParticipantUuid => raisedParticipantUuid != participant.uuid);
    else
      newRaisedParticipantUuids.push(participant.uuid);

    this.setState({ raisedParticipantUuids: newRaisedParticipantUuids });
    proposedIndicatorService.handleCreateAndRemoveIndicator(this.props.scorecardUuid, this.props.selectedIndicator, participant.uuid);
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

  render() {
    return (
      <View>
        <BottomSheetModalTitle title="Participant List" />

        <View style={{ padding: containerPadding }}>
          { this.renderParticipantList() }
        </View>
      </View>
    )
  }
}

export default ProposedIndicatorParticipantList;