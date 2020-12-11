import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import {Icon, Button, Text} from 'native-base';
import { Modal, Portal, Divider } from 'react-native-paper';
import { LocalizationContext } from '../Translations';
import { FontSize, FontFamily } from '../../assets/stylesheets/theme/font';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ActionButton from '../ActionButton';
import Color from '../../themes/color';
import realm from '../../db/schema';

export default class ParticipantModal extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
  }

  getGenderIcon(gender) {
    switch (gender) {
      case 'female':
        return 'human-female';
      case 'male':
        return 'human-male'
      default:
        return 'gender-transgender';
    }
  }

  onPressItem(item) {
    this.props.onDismiss();
    this.props.navigation.navigate('CreateNewIndicator', {scorecard_uuid: this.props.scorecardUuid, participant_uuid: item.uuid});
  }

  renderGender = (participant) => {
    if (participant === undefined) return <Text style={{marginLeft: 20}}>---</Text>;
    if (participant.gender === '')
      return <MaterialIcon name="person" size={25} color="#b9b9b9" style={{paddingHorizontal: 10, marginLeft: 20}} />;

    const gender = participant.gender === 'other' ? 'transgender' : participant.gender;
    return <FontAwesomeIcon name={gender} size={25} style={{paddingHorizontal: 10, marginLeft: 20}} color="black" />;
  };

  renderParticipantItem(item, index) {
    const { translations } = this.context;
    let arr = ['disability', 'minority', 'poor', 'youth'];
    let description = [];

    for(let i=0; i<arr.length; i++) {
      if(item[arr[i]]) {
        description.push(translations[arr[i]]);
      }
    }
    description = description.join('; ');

    return (
      <View>
        <TouchableOpacity onPress={() => this.onPressItem(item)} style={styles.participantItem}>
          <View style={styles.numberContainer}>
            <Text style={styles.numberLabel}>{index+1}</Text>
          </View>
          <View style={{flexDirection: 'row', flex: 1}}>
            {this.renderGender(item)}
            <Text style={{marginLeft: 20}}>{item.age}</Text>
            <Text style={{marginLeft: 20}}>{description}</Text>
          </View>
          <MaterialIcon name="arrow-forward-ios" color="black" />
        </TouchableOpacity>
        <Divider />
      </View>
    );
  }

  renderParticipantList() {
    return (
      <FlatList
        style={{flex: 1, backgroundColor: '', marginBottom: 20}}
        data={this.props.participants}
        renderItem={({item, index}) => this.renderParticipantItem(item, index)}
        keyExtractor={item => item.uuid}
      />
    );
  }

  renderNoData() {
    const { translations } = this.context;
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{translations.noData}</Text>
      </View>
    )
  }

  renderAddNewParticipantButton = () => {
    const {translations} = this.context;
    const numberOfParticipant = realm.objects('Scorecard').filtered(`uuid == '${this.props.scorecardUuid}'`)[0].number_of_participant;
    const addedParticipants = realm.objects('Participant').filtered(`scorecard_uuid == '${this.props.scorecardUuid}'`);
    let isDisabled = addedParticipants.length === numberOfParticipant;
    return (
      <View style={{height: 50, alignItems: 'center'}}>
        <Button iconLeft bordered primary disabled={isDisabled} onPress={() => this.props.showAddParticipantModal()} style={{alignSelf: 'flex-end'}}>
          <Icon name='plus' type="FontAwesome" style={isDisabled ? {color: 'gray'} : {color: Color.primaryButtonColor}} />
          <Text style={[styles.buttonLabel, isDisabled ? {color: 'gray'} : {}]}>{translations.addNewParticipant}</Text>
        </Button>
        { isDisabled &&
          <Text style={{color: 'red', fontSize: 14}}>{translations.reachTotalParticipant}</Text>
        }
      </View>
    );
  }

  render() {
    const { translations } = this.context;
    const { onDismiss } = this.props;

    return (
      <Portal>
        <Modal visible={this.props.visible} onDismiss={() => onDismiss()} contentContainerStyle={ styles.container }>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.header}>{translations.participantList}</Text>
            {this.renderAddNewParticipantButton()}
          </View>

          { !!this.props.participants.length && this.renderParticipantList() }
          { !this.props.participants.length && this.renderNoData() }

          <View style={styles.btnWrapper}>
            <ActionButton
              onPress={() => onDismiss()}
              label={translations.close}
              customBackgroundColor={Color.primaryButtonColor}
              customButtonStyle={{width: 100}}
            />
          </View>
        </Modal>
      </Portal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    height: 450,
    marginHorizontal: 30,
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 24,
    fontFamily: FontFamily.title,
    marginBottom: 20,
    textTransform: 'capitalize',
    flex: 1,
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    marginTop: -4,
    padding: 0,
    textAlign: 'center',
  },
  button: {
    paddingLeft: 15,
    paddingRight: 20,
    alignSelf: 'center',
  },
  buttonLabel: {
    color: Color.primaryButtonColor,
  },
  participantItem: {
    flexDirection: 'row',
    borderWidth: 0,
    paddingVertical: 16,
    alignItems: 'center',
  },
});