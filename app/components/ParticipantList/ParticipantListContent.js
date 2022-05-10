import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import {LocalizationContext} from '../Translations';
import ParticipantListContentTitle from './ParticipantListContentTitle';
import ParticipantListItem from './ParticipantListItem';
import NoDataMessage from '../NoDataMessage';
import AddNewParticipantContent from '../ParticipantModal/AddNewParticipantContent';

import { containerPaddingTop, containerPadding } from '../../utils/responsive_util';
import Scorecard from '../../models/Scorecard';
import Participant from '../../models/Participant';

class ParticipantListContent extends React.Component {
  static contextType = LocalizationContext;

  addNewParticipant() {
    this.props.formModalRef.current?.setBodyContent(this.getAddNewParticipantContent());
    this.props.participantModalRef.current?.present();
  }

  getAddNewParticipantContent() {
    return <AddNewParticipantContent
             scorecardUuid={ this.props.scorecardUuid }
             title={this.context.translations.addNewParticipant}
             subTitle={this.context.translations.participantInformation}
             onSaveParticipant={ (participant) => this.props.participantModalRef.current?.dismiss() }
           />
  }

  renderTitle() {
    return <ParticipantListContentTitle
            participants={this.props.participants}
            addNewParticipant={() => this.addNewParticipant()} />
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
        />
      )
    }

    return doms;
  }

  renderNoData() {
    return <NoDataMessage
            title={this.context.translations.pleaseAddParticipant}
            buttonLabel={this.context.translations.addNewParticipant}
            onPress={() => this.addNewParticipant()}
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