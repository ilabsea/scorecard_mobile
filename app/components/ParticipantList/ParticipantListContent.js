import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import {LocalizationContext} from '../Translations';
import ParticipantListContentTitle from './ParticipantListContentTitle';
import ParticipantListItem from './ParticipantListItem';
import NoDataMessage from '../NoDataMessage';
import AddNewParticipantContent from '../ParticipantModal/AddNewParticipantContent';

import { participantListContentHeight } from '../../constants/modal_constant';
import { containerPaddingTop, containerPadding } from '../../utils/responsive_util';
import Scorecard from '../../models/Scorecard';
import Participant from '../../models/Participant';

class ParticipantListContent extends React.Component {
  static contextType = LocalizationContext;

  showParticipantBottomSheet(selectedParticipant) {
    this.props.formModalRef.current?.setBodyContent(this.getAddNewParticipantContent(selectedParticipant));
    this.props.participantModalRef.current?.present();
  }

  getAddNewParticipantContent(selectedParticipant) {
    return <AddNewParticipantContent
            scorecardUuid={ this.props.scorecardUuid }
            title={this.context.translations.editParticipant}
            subTitle={this.context.translations.participantInformation}
            selectedParticipant={selectedParticipant}
            onSaveParticipant={ (participant) => this.props.participantModalRef.current?.dismiss() }
            contentHeight={participantListContentHeight}
          />
  }

  renderTitle() {
    return <ParticipantListContentTitle
            participants={this.props.participants}
            addNewParticipant={() => this.showParticipantBottomSheet(null)} />
  }

  renderParticipantList = () => {
    const numberOfParticipant = Scorecard.find(this.props.scorecardUuid).number_of_participant;
    this.totalParticipant = numberOfParticipant;
    let doms = null;

    if (Participant.getAll(this.props.scorecardUuid).length > 0) {
      doms = this.props.participants.map((participant, index) =>
        <ParticipantListItem key={index} index={index} participant={participant} scorecardUuid={this.props.scorecardUuid}
          participantModalRef={this.props.participantModalRef}
          formModalRef={this.props.formModalRef}
          showParticipantBottomSheet={(selectedParticipant) => this.showParticipantBottomSheet(selectedParticipant)}
        />
      )
    }

    return doms;
  }

  renderNoData() {
    return <NoDataMessage
            title={this.context.translations.pleaseAddParticipant}
            buttonLabel={this.context.translations.addNewParticipant}
            onPress={() => this.showParticipantBottomSheet(null)}
           />
  }

  render () {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        { this.renderTitle() }
        { this.renderParticipantList() }
        { this.props.participants.length == 0 && this.renderNoData() }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: containerPadding,
    paddingHorizontal: 14,
    flexGrow: 1,
    paddingTop: containerPaddingTop,
  },
  itemColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ParticipantListContent;