import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import realm from '../../db/schema';
import {LocalizationContext} from '../../components/Translations';
import HeaderTitle from '../../components/HeaderTitle';
import DependentValidationInputField from '../../components/ParticipateInformation/DependentValidationInputField';
import IndependentValidationInputField from '../../components/ParticipateInformation/IndependentValidationInputField';
import ActionButton from '../../components/ActionButton';

class ParticipateInformation extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      uuid: '',
      allParticipate: 0,
      female: 0,
      disability: 0,
      minority: 0,
      poor: 0,
      youth: 0,
      isError: true,
      participateValidation: {
        'allParticipate': true,
        'female': true,
        'disability': true,
        'minority': true,
        'poor': true,
        'youth': true,
      },
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
      allParticipate,
      female,
      disability,
      minority,
      poor,
      youth,
      uuid,
    } = this.state;
    
    const participate = {
      allParticipate: this.getIntegerOf(allParticipate),
      female: this.getIntegerOf(female),
      disability: this.getIntegerOf(disability),
      minority: this.getIntegerOf(minority),
      poor: this.getIntegerOf(poor),
      youth: this.getIntegerOf(youth),
      uuid: uuid,
    };

    this.clearParticipateFromLocalStorage();
    realm.write(() => {
      realm.create('Participate', participate);
    });
  }

  clearParticipateFromLocalStorage = () => {
    realm.write(() => {
      const participate = realm.objects('Participate').filtered('uuid = "' + this.state.uuid + '"');
      realm.delete(participate);
    });
  }

  getIntegerOf = (value) => {
    return parseInt(value) || 0;
  }

  updateParticipateState = (states) => {
    this.setState(states);
  }

  renderFormInput = () => {
    const {translations} = this.context;
    const {
      allParticipate,
      female,
      disability,
      minority,
      poor,
      youth,
      participateValidation,
    } = this.state;

    const dependentParticipate = {
      female,
      disability,
      minority,
      poor,
      youth,
    };

    return (
      <View style={{marginTop: 30}}>
        <IndependentValidationInputField
          value={allParticipate}
          label={translations['allParticipate']}
          placeholder={translations['enterNumberOfParticipate']}
          updateStateValue={this.updateParticipateState}
          participateValidation={participateValidation}
          dependentParticipate={dependentParticipate}
        />
        <DependentValidationInputField
          value={female}
          label={translations['female']}
          placeholder={translations['enterNumberOfFemale']}
          fieldName="female"
          updateStateValue={this.updateParticipateState}
          independentParticipate={allParticipate}
          participateValidation={participateValidation}
        />
        <DependentValidationInputField
          value={disability}
          label={translations['disability']}
          placeholder={translations['enterNumberOfDisability']}
          fieldName="disability"
          updateStateValue={this.updateParticipateState}
          independentParticipate={allParticipate}
          participateValidation={participateValidation}
        />
        <DependentValidationInputField
          value={minority}
          label={translations['minority']}
          placeholder={translations['enterNumberOfMinority']}
          fieldName="minority"
          updateStateValue={this.updateParticipateState}
          independentParticipate={allParticipate}
          participateValidation={participateValidation}
        />
        <DependentValidationInputField
          value={poor}
          label={translations['poor']}
          placeholder={translations['enterNumberOfPoor']}
          fieldName="poor"
          updateStateValue={this.updateParticipateState}
          independentParticipate={allParticipate}
          participateValidation={participateValidation}
        />
        <DependentValidationInputField
          value={youth}
          label={translations['youth']}
          placeholder={translations['enterNumberOfYouth']}
          fieldName="youth"
          updateStateValue={this.updateParticipateState}
          independentParticipate={allParticipate}
          participateValidation={participateValidation}
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

export default ParticipateInformation;