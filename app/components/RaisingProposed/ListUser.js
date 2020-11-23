import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Icon} from 'native-base';
import {LocalizationContext} from '../Translations';
import UserTable from './UserTable';
import realm from '../../db/schema';
import {connect} from 'react-redux';
class ListUser extends Component {
  static contextType = LocalizationContext;
  getParticipant = () => {
    const numberOfParticipant = realm.objects('ParticipantInformation').filtered('uuid = "' + this.props.uuid + '"')[0].participant;
    const savedParticipants = this.props.participants;
    let participants = [];
    for (let i=0; i<savedParticipants.length; i++) {
      const gender = savedParticipants[i].gender === 'female' ? 'F' : savedParticipants[i].gender === 'male' ? 'M' : 'other';
      const attr = [i+1, savedParticipants[i].age, gender, savedParticipants[i].disability, savedParticipants[i].indicator_shortcut_name, savedParticipants[i].note, savedParticipants[i].uuid];
      participants.push(attr);
    }

    for (let i = savedParticipants.length; i<numberOfParticipant; i++) {
      const attr = [i+1, '', '', '', '', '', ''];
      participants.push(attr);
    }
    return participants;
  }

  renderUserTable = () => {
    const tableHead = ['No', 'Age', 'Gender', 'Disability', 'Indicator Type', 'Note', 'Action'];
    const tableData = this.getParticipant()
    return (
      <UserTable tableHead={tableHead} tableData={tableData} scorecardUUID={this.props.uuid} navigation={this.props.navigation}/>
    );
  }

  render() {
    const {translations} = this.context;
    return (
      <View style={{marginTop: 40}}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingTitle}>
            {translations['listUser']}
          </Text>
          <Button iconLeft primary style={styles.button}
            onPress={() => this.props.openCreateNewIndicatorScreen()}>
            <Icon name="add"/>
            <Text style={styles.buttonLabel}>{translations['addNewUser']}</Text>
          </Button>
        </View>
        {this.renderUserTable()}
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
    paddingRight: 25,
    alignSelf: 'center',
    height: 50,
  },
  buttonLabel: {
    textTransform: 'uppercase',
    color: 'white',
    fontSize: 18,
    paddingLeft: 10,
  },
});

function mapStateToProps(state) {
  return {participants: state.participantReducer.participants};
}

export default connect(mapStateToProps, null)(ListUser);