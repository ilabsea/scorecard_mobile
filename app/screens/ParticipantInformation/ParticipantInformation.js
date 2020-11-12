import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import realm from '../../db/schema';
import {LocalizationContext} from '../../components/Translations';
import HeaderTitle from '../../components/HeaderTitle';
import DependentValidationInputField from '../../components/ParticipantInformation/DependentValidationInputField';
import IndependentValidationInputField from '../../components/ParticipantInformation/IndependentValidationInputField';
import ActionButton from '../../components/ActionButton';

class ParticipantInformation extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.participantRef = React.createRef();
    this.femaleRef = React.createRef();
    this.disabilityRef = React.createRef();
    this.minorityRef = React.createRef();
    this.poorRef = React.createRef();
    this.youthRef = React.createRef();
    this.state = {
      uuid: '',
      participant: 0,
      female: 0,
      disability: 0,
      minority: 0,
      poor: 0,
      youth: 0,
      isError: true,
    };
  }

  async componentDidMount() {
    const scorecard = JSON.parse(await AsyncStorage.getItem('SCORECARD_DETAIL'));
    this.setState({uuid: scorecard.uuid});
  }

  save = () => {
    if (this.state.isError)
      return;

    const {
      participant,
      female,
      disability,
      minority,
      poor,
      youth,
      uuid,
    } = this.state;
    
    const allParticipant = {
      participant: this.getIntegerOf(participant),
      female: this.getIntegerOf(female),
      disability: this.getIntegerOf(disability),
      minority: this.getIntegerOf(minority),
      poor: this.getIntegerOf(poor),
      youth: this.getIntegerOf(youth),
      uuid: uuid,
    };

    this.clearParticipantFromLocalStorage();
    realm.write(() => {
      realm.create('Participant', allParticipant);
    });
  }

  clearParticipantFromLocalStorage = () => {
    realm.write(() => {
      const participant = realm.objects('Participant').filtered('uuid = "' + this.state.uuid + '"');
      realm.delete(participant);
    });
  }

  getIntegerOf = (value) => {
    return parseInt(value) || 0;
  }

  updateParticipantState = (states) => {
    this.setState(states);
    this.validateForm();
  }
  validateForm = () => {
    const otherParticipantRefs = [
      this.participantRef,
      this.femaleRef,
      this.disabilityRef,
      this.minorityRef,
      this.poorRef,
      this.youthRef,
    ];

    let isError = false;
    for(let i=0; i<otherParticipantRefs.length; i++) {
      if (!otherParticipantRefs[i].current.state.isValid) {
        isError = true;
        break;
      }
    }
    this.setState({isError});
  }

  onParticipantChange = (participant) => {
    this.setState({participant}, () => {
      const {female, disability, minority, poor, youth} = this.state;
      const otherParticipants = [
        {control: this.femaleRef, value: female},
        {control: this.disabilityRef, value: disability},
        {control: this.minorityRef, value: minority},
        {control: this.poorRef, value: poor},
        {control: this.youthRef, value: youth},
      ];

      otherParticipants.map((otherParticipant) => {
        otherParticipant.control.current.onChangeText(otherParticipant.value);
      });
    });
  }

  renderFormInput = () => {
    const {translations} = this.context;
    const {
      participant,
      female,
      disability,
      minority,
      poor,
      youth,
    } = this.state;

    return (
      <View style={{marginTop: 30}}>
        <IndependentValidationInputField
          ref={this.participantRef}
          value={participant}
          label={translations['allParticipant']}
          placeholder={translations['enterNumberOfParticipant']}
          onParticipantChange={this.onParticipantChange}
        />
        <DependentValidationInputField
          ref={this.femaleRef}
          value={female}
          label={translations['female']}
          placeholder={translations['enterNumberOfFemale']}
          fieldName="female"
          dependentParticipant={participant}
          updateStateValue={this.updateParticipantState}
        />
        <DependentValidationInputField
          ref={this.disabilityRef}
          value={disability}
          label={translations['disability']}
          placeholder={translations['enterNumberOfDisability']}
          fieldName="disability"
          updateStateValue={this.updateParticipantState}
          dependentParticipant={participant}
        />
        <DependentValidationInputField
          ref={this.minorityRef}
          value={minority}
          label={translations['minority']}
          placeholder={translations['enterNumberOfMinority']}
          fieldName="minority"
          updateStateValue={this.updateParticipantState}
          dependentParticipant={participant}
        />
        <DependentValidationInputField
          ref={this.poorRef}
          value={poor}
          label={translations['poor']}
          placeholder={translations['enterNumberOfPoor']}
          fieldName="poor"
          updateStateValue={this.updateParticipantState}
          dependentParticipant={participant}
        />
        <DependentValidationInputField
          ref={this.youthRef}
          value={youth}
          label={translations['youth']}
          placeholder={translations['enterNumberOfYouth']}
          fieldName="youth"
          updateStateValue={this.updateParticipantState}
          dependentParticipant={participant}
        />
      </View>
    );
  };

  renderSaveButton = () => {
    if (!this.state.isError) {
      const {translations} = this.context;
      return (
        <View style={styles.buttonContainer}>
          <ActionButton
            label={translations['next']}
            onPress={() => this.save()}
            isDisabled={this.state.isLoading}
          />
        </View>
      );
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <HeaderTitle
            headline="facilitatorList"
            subheading="pleaseFillInformationBelow"
          />
          {this.renderFormInput()}
          {this.renderSaveButton()}
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
});

export default ParticipantInformation;