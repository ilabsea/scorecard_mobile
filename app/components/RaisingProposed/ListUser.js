import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Icon, Text} from 'native-base';
import {LocalizationContext} from '../Translations';
import UserTable from './UserTable';
import realm from '../../db/schema';
import {connect} from 'react-redux';
import ParticipantModal from './ParticipantModal';
import AddNewParticiantModal from './AddNewParticipantModal';
import Color from '../../themes/color';
class ListUser extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      participantVisible: false,
      addParticiantVisible: false,
    };
  }

  getParticipant = () => {
    let savedParticipants = this.props.participants;
    if (savedParticipants.length == 0)
      savedParticipants = realm.objects('Participant').filtered('scorecard_uuid = "'+ this.props.scorecardUUID +'"').sorted('order', false);

    let participants = [];
    for (let i=0; i<savedParticipants.length; i++) {
      const gender = savedParticipants[i].gender === 'female' ? 'F' : savedParticipants[i].gender === 'male' ? 'M' : 'other';
      const attrs = [
        i + 1,
        savedParticipants[i].age,
        gender,
        savedParticipants[i].disability,
        savedParticipants[i].proposed_criterias != undefined ? savedParticipants[i].proposed_criterias : this.getProposedCriteria(savedParticipants[i].uuid),
        savedParticipants[i].note,
        savedParticipants[i].uuid, // participant uuid
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

  _showParticipantModal = () => {
    let participants = realm.objects('Participant').filtered(`scorecard_uuid='${this.props.scorecardUUID}' AND raised=false`).sorted('order', false);
    this.setState({
      participantVisible: true,
      participants: participants,
    });
  };

  _showAddParticipantModal = () => {
    this.setState({
      participantVisible: false,
      addParticipantVisible: true,
    });
  }

  _hideAddParticipantModal = () => {
    this.setState({
      addParticipantVisible: false,
      participantVisible: true,
    });
  }

  render() {
    const {translations} = this.context;
    return (
      <View style={{marginTop: 40}}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingTitle}>{translations['listUser']}</Text>
          <Button
            onPress={() => this._showParticipantModal()}
            iconLeft
            style={{backgroundColor: Color.headerColor}}>
            <Icon name='plus' type="FontAwesome" />
            <Text>{translations.proposeNewCriteria}</Text>
          </Button>
        </View>
        {this.renderUserTable()}
        <ParticipantModal
          participants={this.state.participants || []}
          visible={this.state.participantVisible}
          scorecardUuid={this.props.scorecardUUID}
          navigation={this.props.navigation}
          onDismiss={() => this.setState({participantVisible: false})}
          showAddParticipantModal={() => this._showAddParticipantModal()}
        />

        <AddNewParticiantModal
          visible={this.state.addParticipantVisible}
          onDismiss={() => this.setState({addParticipantVisible: false})}
          onClose={() => this._hideAddParticipantModal()}
          scorecardUuid={this.props.scorecardUUID}
          navigation={this.props.navigation}
        />
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