import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import BottomSheetModalTitle from '../BottomSheetModalTitle';
import ParticipantModalListItem from '../RaisingProposed/ParticipantModalListItem';
import ProposedIndicatorParticipantListSubtitle from './ProposedIndicatorParticipantListSubtitle';

import ProposedIndicator from '../../models/ProposedIndicator';
import Participant from '../../models/Participant';
import proposedIndicatorService from '../../services/proposed_indicator_service';
import { containerPadding } from '../../utils/responsive_util';
import { participantContentHeight } from '../../constants/modal_constant';

class ProposedIndicatorParticipantList extends React.Component {
  static contextType = LocalizationContext;
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
      return <Icon name='check' size={23} color={ Color.clickableColor } />

    return <View/>;
  }

  toggleParticipant(participant) {
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
            rightIcon={this.selectedIcon(participant)}
          />
        </View>
      )
    });
  }

  render() {
    return (
      <View style={{ height: hp(participantContentHeight) }}>
        <BottomSheetModalTitle title={ this.props.selectedIndicator.name } />

        <View style={{ padding: containerPadding, flex: 1 }}>
          <ProposedIndicatorParticipantListSubtitle raisedParticipant={this.state.raisedParticipantUuids.length} totalParticipant={this.participants.length}
            showAddParticipantModal={() => this.props.showAddParticipantModal()}
          />

          <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
            { this.renderParticipantList() }
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default ProposedIndicatorParticipantList;