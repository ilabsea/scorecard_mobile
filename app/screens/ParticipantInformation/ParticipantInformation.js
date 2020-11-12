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
    
    const attrs = {
      participant: this.getIntegerOf(this.participantRef.current.state.participant),
      female: this.getIntegerOf(this.femaleRef.current.state.participant),
      disability: this.getIntegerOf(this.disabilityRef.current.state.participant),
      minority: this.getIntegerOf(this.minorityRef.current.state.participant),
      poor: this.getIntegerOf(this.poorRef.current.state.participant),
      youth: this.getIntegerOf(this.youthRef.current.state.participant),
      uuid: this.state.uuid,
    };

    this.clearParticipantFromLocalStorage();
    realm.write(() => {
      realm.create('Participant', attrs);
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

  onParticipantChange = () => {
    this.setState({
      isError: !this.participantRef.current.state.isValid,
      participant: this.participantRef.current.state.participant,
    }, () => {
      if(!this.participantRef.current.state.inValid) {
        const otherParticipantRefs = [
          this.femaleRef,
          this.disabilityRef,
          this.minorityRef,
          this.poorRef,
          this.youthRef,
        ];
        otherParticipantRefs.map((otherParticipantRef) => {
          otherParticipantRef.current.onChangeText(otherParticipantRef.current.state.participant);
        });
      }
    });
  }

  renderFormInput = () => {
    const {translations} = this.context;
    return (
      <View style={{marginTop: 30}}>
        <IndependentValidationInputField
          ref={this.participantRef}
          label={translations['allParticipant']}
          placeholder={translations['enterNumberOfParticipant']}
          onParticipantChange={this.onParticipantChange}
        />
        <DependentValidationInputField
          ref={this.femaleRef}
          label={translations['female']}
          placeholder={translations['enterNumberOfFemale']}
          fieldName="female"
          dependentParticipant={this.state.participant}
          validateForm={this.validateForm}
        />
        <DependentValidationInputField
          ref={this.disabilityRef}
          label={translations['disability']}
          placeholder={translations['enterNumberOfDisability']}
          fieldName="disability"
          dependentParticipant={this.state.participant}
          validateForm={this.validateForm}
        />
        <DependentValidationInputField
          ref={this.minorityRef}
          label={translations['minority']}
          placeholder={translations['enterNumberOfMinority']}
          fieldName="minority"
          dependentParticipant={this.state.participant}
          validateForm={this.validateForm}
        />
        <DependentValidationInputField
          ref={this.poorRef}
          label={translations['poor']}
          placeholder={translations['enterNumberOfPoor']}
          fieldName="poor"
          dependentParticipant={this.state.participant}
          validateForm={this.validateForm}
        />
        <DependentValidationInputField
          ref={this.youthRef}
          label={translations['youth']}
          placeholder={translations['enterNumberOfYouth']}
          fieldName="youth"
          dependentParticipant={this.state.participant}
          validateForm={this.validateForm}
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