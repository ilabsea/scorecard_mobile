import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import {LocalizationContext} from '../Translations';
import ParticipantHeader from './ParticipantHeader';
import ParticipantList from './ParticipantList';
import EmptyListAction from '../Share/EmptyListAction';
import AddNewParticipantMain from '../ParticipantModal/AddNewParticipantMain';

import { participantContentHeight, participantModalSnapPoints } from '../../constants/modal_constant';
import { containerPaddingTop, containerPadding } from '../../utils/responsive_util';

class ParticipantMain extends React.Component {
  static contextType = LocalizationContext;

  showParticipantBottomSheet(selectedParticipant) {
    this.props.formModalRef.current?.setSnapPoints(participantModalSnapPoints);
    this.props.formModalRef.current?.setBodyContent(this.getAddNewParticipantMain(selectedParticipant));
    this.props.participantModalRef.current?.present();
  }

  getAddNewParticipantMain(selectedParticipant) {
    return <AddNewParticipantMain
            scorecardUuid={ this.props.scorecardUuid }
            title={!!selectedParticipant ? this.context.translations.editParticipant : this.context.translations.addNewParticipant}
            subTitle={this.context.translations.participantInformation}
            selectedParticipant={selectedParticipant}
            onSaveParticipant={ (participant) => this.props.participantModalRef.current?.dismiss() }
            contentHeight={participantContentHeight}
          />
  }

  renderTitle() {
    return <ParticipantHeader
            participants={this.props.participants}
            addNewParticipant={() => this.showParticipantBottomSheet(null)} />
  }

  renderParticipantList = () => {
    return <ParticipantList
              scorecardUuid={this.props.scorecardUuid}
              participants={this.props.participants}
              participantModalRef={this.props.participantModalRef}
              formModalRef={this.props.formModalRef}
              showParticipantBottomSheet={(participant) => this.showParticipantBottomSheet(participant)}
           />
  }

  renderNoData() {
    return <EmptyListAction
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
  }
});

export default ParticipantMain;