import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

class ParticipantListItem extends Component {
  renderParticipantNumber = (participant, index) => {
    if (participant != undefined)
      return (
        <View style={styles.numberContainer}>
          <Text style={styles.numberLabel}>{index + 1}</Text>
        </View>
      );

    return <MaterialIcon name="help" size={45} color="gray" style={{marginTop: -4}} />;
  };

  renderGender = (participant) => {
    if (participant === undefined || participant.gender === '')
      return <MaterialIcon name="person" size={25} color="#b9b9b9" style={{paddingHorizontal: 10}} />;

    const gender = participant.gender === 'other' ? 'transgender' : participant.gender;
    return <FontAwesomeIcon name={gender} size={25} style={{paddingHorizontal: 10}} />;
  };

  getAge = (participant) => {
    if (participant === undefined || participant.age === '')
      return 0;

    return participant.age;
  }

  renderStatusIcon = (participant, fieldName) => {
    if (participant === undefined || !participant[fieldName])
      return <MaterialIcon name="cancel" size={25} color="#a52b2b" />;

    return <MaterialIcon name="check-circle" size={25} color="#4a76f3" />;
  }

  editParticipant = (index) => {
    const participantUUID = this.props.participant != undefined ? this.props.participant.uuid : null;
    this.props.navigation.navigate('AddNewParticipant',
      {uuid: this.props.uuid, index: index, participant_uuid: participantUUID});
  }

  render() {
    const {index, participant} = this.props;
    return (
      <View>
        <View style={{flexDirection: 'row', flex: 1, paddingTop: 20, paddingBottom: 5, borderWidth: 0}}>
          <View style={{borderWidth: 0, flex: 0.5}}>
            {this.renderParticipantNumber(participant, index)}
          </View>
          <View style={styles.itemColumn}>
            <View style={styles.itemValueContainer}>{this.renderGender(participant)}</View>
          </View>
          <View style={styles.itemColumn}>
            <View style={styles.itemValueContainer}>
              <Text style={{fontSize: 18}}>{this.getAge(participant)}</Text>
            </View>
          </View>
          <View style={styles.itemColumn}>
            <View style={styles.itemValueContainer}>
              {this.renderStatusIcon(participant, 'disability')}
            </View>
          </View>
          <View style={styles.itemColumn}>
            <View style={styles.itemValueContainer}>
              {this.renderStatusIcon(participant, 'minority')}
            </View>
          </View>
          <View style={styles.itemColumn}>
            <View style={styles.itemValueContainer}>
              {this.renderStatusIcon(participant, 'poor')}
            </View>
          </View>
          <View style={styles.itemColumn}>
            <View style={styles.itemValueContainer}>
              {this.renderStatusIcon(participant, 'youth')}
            </View>
          </View>
          <TouchableOpacity style={{width: 60, alignItems: 'center', paddingTop: 0}}
            onPress={() => this.editParticipant(index)}>
            <MaterialIcon name="edit" size={25} color="#e4761e" />
            <Text style={{color: '#e4761e'}}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={{borderBottomWidth: 1, borderBottomColor: '#b9b9b9', flex: 1}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemColumn: {
    flex: 1,
    height: 60,
    alignItems: 'center',
  },
  itemValueContainer: {
    paddingTop: 10,
  },
  numberContainer: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  numberLabel: {
    fontWeight: '700',
    fontSize: 18,
    color: 'white',
    margin: 0,
    padding: 0,
    textAlign: 'center',
  },
});

export default ParticipantListItem;
