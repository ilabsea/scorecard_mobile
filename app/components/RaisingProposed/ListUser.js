import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Icon, Text} from 'native-base';
import {LocalizationContext} from '../Translations';
import UserTable from './UserTable';
import realm from '../../db/schema';
import { connect } from 'react-redux';
import { getRaisedParticipants } from '../../services/participant_service';

import ParticipantInfo from '../CreateNewIndicator/ParticipantInfo';

class ListUser extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      participants: [],
    };
  }

  getParticipant = () => {
    const raisedParticipants = getRaisedParticipants(this.props.participants, this.props.scorecardUUID);
    let participants = [];
    for (let i=0; i<raisedParticipants.length; i++) {
      const gender = raisedParticipants[i].gender === 'female' ? 'F' : raisedParticipants[i].gender === 'male' ? 'M' : 'other';
      const proposedCriterias = raisedParticipants[i].proposed_criterias != undefined ? raisedParticipants[i].proposed_criterias : this.getProposedCriteria(raisedParticipants[i].uuid);
      if (proposedCriterias.length === 0)
        continue;

      const attrs = [
        i + 1,
        raisedParticipants[i].age,
        gender,
        raisedParticipants[i].disability,
        proposedCriterias,
        raisedParticipants[i].note,
        raisedParticipants[i].uuid, // participant uuid
      ];
      participants.push(attrs);
    }
    return participants;
  };

  getProposedCriteria = (participantUuid) => {
    return realm.objects('ProposedCriteria').filtered('scorecard_uuid = "'+ this.props.scorecardUUID +'" AND participant_uuid = "'+ participantUuid +'"');
  }

  renderUserTable = () => {
    const tableHead = ['No', 'Age', 'Gender', 'Disability', 'Indicator Type', 'Note', 'Action'];
    const tableData = this.getParticipant();

    return (
      <UserTable tableHead={tableHead} tableData={tableData} scorecardUUID={this.props.scorecardUUID} navigation={this.props.navigation} />
    );
  };

  _goToCreateNewIndicator(participant_uuid) {
    this.props.navigation.navigate('CreateNewIndicator', {scorecard_uuid: this.props.scorecardUUID, participant_uuid: participant_uuid});
  }

  render() {
    const {translations} = this.context;

    return (
      <View style={{marginTop: 40}}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingTitle}>{translations['listUser']}</Text>

          <ParticipantInfo
            scorecard_uuid={ this.props.scorecardUUID }
            mode={{type: 'button', label: translations.proposeNewCriteria, iconName: 'plus'}}
            onPressItem={(participant) => this._goToCreateNewIndicator(participant.uuid)}
            onPressCreateParticipant={(participant) => this._goToCreateNewIndicator(participant.uuid)}
            navigation={this.props.navigation}/>

        </View>

        { this.renderUserTable() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    color: '#22354c',
  },
});

function mapStateToProps(state) {
  return {participants: state.participantReducer.participants};
}

export default connect(mapStateToProps, null)(ListUser);
