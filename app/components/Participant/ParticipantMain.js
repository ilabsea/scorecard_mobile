import React from 'react';
import { StyleSheet, View } from 'react-native';

import {LocalizationContext} from '../Translations';
import ParticipantHeader from './ParticipantHeader';
import ParticipantList from './ParticipantList';
import EmptyListAction from '../Share/EmptyListAction';
import AddNewParticipantMain from '../ParticipantModal/AddNewParticipantMain';

import { participantListContentHeight, participantListModalSnapPoints } from '../../constants/modal_constant';
import { containerPaddingTop, containerPadding } from '../../utils/responsive_util';

class ParticipantMain extends React.Component {
  static contextType = LocalizationContext;

  showParticipantBottomSheet(selectedParticipant) {
    this.props.formModalRef.current?.setBodyContent(this.getAddNewParticipantMain(selectedParticipant));
    this.props.formModalRef.current?.setSnapPoints(participantListModalSnapPoints);
    this.props.participantModalRef.current?.present();
  }

  getAddNewParticipantMain(selectedParticipant) {
    return <AddNewParticipantMain
            scorecardUuid={ this.props.scorecardUuid }
            title={!!selectedParticipant ? this.context.translations.editParticipant : this.context.translations.addNewParticipant}
            subTitle={this.context.translations.participantInformation}
            selectedParticipant={selectedParticipant}
            onSaveParticipant={ (participant) => this.props.participantModalRef.current?.dismiss() }
            contentHeight={participantListContentHeight}
          />
  }

  renderTitle() {
    return <ParticipantHeader
            participants={this.props.participants}
            addNewParticipant={() => this.showParticipantBottomSheet(null)} />
  }

  renderParticipantList = () => {
    return <ParticipantList participants={this.props.participants} scorecardUuid={this.props.scorecardUuid}
              showParticipantBottomSheet={(participant) => this.showParticipantBottomSheet(participant)}
              updateParticipants={this.props.updateParticipants}
              formModalRef={this.props.formModalRef}
              participantModalRef={this.props.participantModalRef}
              navigation={this.props.navigation}
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
    console.log('=== participant main = ', this.props.participants)

    return (
      <View style={styles.container}>
        { this.renderTitle() }
        {/* { this.renderParticipantList() } */}
        { this.props.participants.length == 0 ? this.renderNoData() : this.renderParticipantList() }
      </View>
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

export default ParticipantMain;