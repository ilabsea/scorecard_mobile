import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Icon} from 'native-base';
import {LocalizationContext} from '../Translations';
import UserTable from './UserTable';
import realm from '../../db/schema';
import {connect} from 'react-redux';
import ParticipantModal from './ParticipantModal';
import AddNewParticiantModal from './AddNewParticipantModal';
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
    const savedParticipants = this.props.participants;
    let participants = [];
    for (let i=0; i<savedParticipants.length; i++) {
      const gender = savedParticipants[i].gender === 'female' ? 'F' : savedParticipants[i].gender === 'male' ? 'M' : 'other';
      const attrs = [
        i + 1,
        savedParticipants[i].age,
        gender,
        savedParticipants[i].disability,
        savedParticipants[i].proposed_criterias,
        savedParticipants[i].note,
        savedParticipants[i].uuid, // participant uuid
      ];
      participants.push(attrs);
    }
    return participants;
  };

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
          <Button iconLeft primary style={styles.button} onPress={() => this._showParticipantModal()}>
            <Icon name="add" />
            <Text style={styles.buttonLabel}>
              {translations['proposeNewCriteria']}
            </Text>
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
  button: {
    paddingLeft: 15,
    paddingRight: 20,
    alignSelf: 'center',
    height: 50,
  },
  buttonLabel: {
    textTransform: 'uppercase',
    color: 'white',
    fontSize: 18,
  },
});

function mapStateToProps(state) {
  return {participants: state.participantReducer.participants};
}

export default connect(mapStateToProps, null)(ListUser);