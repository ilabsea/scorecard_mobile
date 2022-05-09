import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import {LocalizationContext} from '../Translations';
import ParticipantListContentTitle from './ParticipantListContentTitle';
import ParticipantListItem from './ParticipantListItem';
import NoDataMessage from '../NoDataMessage';

import { containerPaddingTop, containerPadding } from '../../utils/responsive_util';
import Scorecard from '../../models/Scorecard';
import Participant from '../../models/Participant';
import { navigate } from '../../navigators/app_navigator';

class ParticipantListContent extends React.Component {
  static contextType = LocalizationContext;

  addNewParticipant() {
    navigate('AddNewParticipant', {scorecard_uuid: this.props.scorecardUuid});
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
        <ParticipantListItem key={index} index={index} participant={participant} scorecardUuid={this.props.scorecardUuid} />
      )
    }

    return doms;
  }

  renderNoData() {
    const { translations } = this.context;

    return (
      <NoDataMessage
        title={translations.pleaseAddParticipant}
        buttonLabel={translations.addNewParticipant}
        onPress={() => this.addNewParticipant()}
      />
    );
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