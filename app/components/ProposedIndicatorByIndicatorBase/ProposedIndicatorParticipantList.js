import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import styles from '../../themes/participantListItemStyle';
import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import OutlinedButton from '../OutlinedButton';
import BottomSheetModalTitle from '../BottomSheetModalTitle';
import ParticipantModalListItem from '../RaisingProposed/ParticipantModalListItem';

import ProposedIndicator from '../../models/ProposedIndicator';
import Participant from '../../models/Participant';
import proposedIndicatorService from '../../services/proposed_indicator_service';
import { containerPadding } from '../../utils/responsive_util';
import { bodyFontSize } from '../../utils/font_size_util';
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

  renderAddNewParticipantButton = () => {
    return (
      <OutlinedButton
        icon="plus"
        label={this.context.translations.addNew}
        onPress={() => this.props.showAddParticipantModal() }
      />
    );
  }

  render() {
    return (
      <View style={{ height: hp(participantContentHeight) }}>
        <BottomSheetModalTitle title={ this.props.selectedIndicator.name } />

        <View style={{ padding: containerPadding, flex: 1 }}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text style={[styles.header, { fontSize: bodyFontSize() }]}>{this.context.translations.selectRaisedParticipant}</Text>
            <View style={{flex:1}} />
            {this.renderAddNewParticipantButton()}
          </View>

          <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
            { this.renderParticipantList() }
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default ProposedIndicatorParticipantList;
