import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { LocalizationContext } from '../Translations';
import BottomSheetModalTitle from '../BottomSheetModalTitle';
import ParticipantModalListItem from './ParticipantModalListItem';
import ParticipantModalListItemRightIcon from './ParticipantModalListItemRightIcon';
import ParticipantModalSubtitle from './ParticipantModalSubtitle';
import FormBottomSheetButton from '../FormBottomSheetModal/FormBottomSheetButton';

import ProposedIndicator from '../../models/ProposedIndicator';
import Participant from '../../models/Participant';
import proposedIndicatorService from '../../services/proposed_indicator_service';
import { containerPadding } from '../../utils/responsive_util';
import { bodyFontSize } from '../../utils/font_size_util';
import { isCreateNewIndicatorScreen } from '../../utils/screen_util';
import { participantModalContentHeight } from '../../constants/modal_constant';
import { navigate } from '../../navigators/app_navigator';

class ParticipantModalMain extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      raisedParticipantUuids: [],
    }
    this.participants = !!props.participants ? props.participants
                        : Participant.getAllByScorecard(props.scorecardUuid);
    this.isCreateIndicatorByIndicatorBase = props.isIndicatorBase && isCreateNewIndicatorScreen()
  }

  async componentDidMount() {
    if (this.isCreateIndicatorByIndicatorBase) {
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
    if (!selectedIndicator) return false;

    return !!ProposedIndicator.findByParticipant(scorecardUuid, selectedIndicator.indicatorable_id, participantUuid);
  }

  listItemRightIcon = (participantUuid) => {
    return <ParticipantModalListItemRightIcon participantUuid={participantUuid} raisedParticipantUuids={this.state.raisedParticipantUuids}
            isIndicatorBase={this.props.isIndicatorBase} />
  }

  toggleParticipant(participant) {
    if (!!this.props.selectParticipant) {
      this.props.participantModalRef.current?.dismiss();
      this.props.selectParticipant(participant);
    }
    else
      this.props.isIndicatorBase ? this.handleToggleParticipantOnIndicatorBase(participant.uuid)
                                 : this.handleToggleParticipantOnParticipantBase(participant.uuid);
  }

  handleToggleParticipantOnParticipantBase(participantUuid) {
    this.props.participantModalRef.current?.dismiss();
    navigate('CreateNewIndicator', {scorecard_uuid: this.props.scorecardUuid, participant_uuid: participantUuid});
  }

  handleToggleParticipantOnIndicatorBase(participantUuid) {
    let newRaisedParticipantUuids = this.state.raisedParticipantUuids;
    if (this.isParticipantRaised(participantUuid))
      newRaisedParticipantUuids =  this.state.raisedParticipantUuids.filter(raisedParticipantUuid => raisedParticipantUuid != participantUuid);
    else
      newRaisedParticipantUuids.push(participantUuid);

    this.setState({ raisedParticipantUuids: newRaisedParticipantUuids }, () => {
      proposedIndicatorService.handleCreateAndRemoveIndicator(this.props.scorecardUuid, this.props.selectedIndicator, participantUuid);
    });
  }

  renderParticipantList() {
    return this.participants.map((participant, index) => {
      return (
        <ParticipantModalListItem
          key={participant.uuid}
          participant={participant}
          onPress={() => this.toggleParticipant(participant) }
          rightIcon={this.listItemRightIcon(participant.uuid)}
          hasArrowIcon={!this.isCreateIndicatorByIndicatorBase}
        />
      )
    });
  }

  renderNoMessage() {
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: bodyFontSize()}}>{ this.context.translations.noParticipant }</Text>
           </View>
  }

  render() {
    const customTitle = !!this.props.selectedIndicator ? this.props.selectedIndicator.name :  this.props.title;
    const title = customTitle || this.context.translations.proposeTheIndicator;

    return (
      <View style={{ height: hp(participantModalContentHeight) }}>
        <BottomSheetModalTitle title={title} />

        <View style={{ padding: containerPadding, paddingBottom: this.isCreateIndicatorByIndicatorBase ? 0 : containerPadding, flex: 1 }}>
          <ParticipantModalSubtitle
            raisedParticipant={this.state.raisedParticipantUuids.length}
            totalParticipant={this.participants.length}
            showAddParticipantModal={() => this.props.showAddParticipantModal()}
            isIndicatorBase={this.props.isIndicatorBase}
            selectedIndicator={this.props.selectedIndicator}
            scorecardUuid={this.props.scorecardUuid}
          />

          <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
            { this.participants.length > 0 ? this.renderParticipantList() : this.renderNoMessage() }
          </ScrollView>
        </View>

        { this.isCreateIndicatorByIndicatorBase &&
          <FormBottomSheetButton isValid={true} save={() => this.props.participantModalRef.current?.dismiss()} />
        }
      </View>
    )
  }
}

export default ParticipantModalMain;