import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import realm from '../../db/schema';
import {LocalizationContext} from '../../components/Translations';
import HeaderTitle from '../../components/HeaderTitle';
import TextFieldInput from '../../components/TextFieldInput';
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

  onChangeText = (type, value) => {
    const {
      allParticipate,
      female,
      disability,
      minority,
      poor,
      youth,
      participateValidation,
    } = this.state;

    let formValidation = participateValidation;
    let numOfAllParticipate = this.getIntegerOf(allParticipate);
    const otherParticipate = {
      female: this.getIntegerOf(female),
      disability: this.getIntegerOf(disability),
      minority: this.getIntegerOf(minority),
      poor: this.getIntegerOf(poor),
      youth: this.getIntegerOf(youth),
    };

    let participate = {};
    participate[type] = value;
    this.setState(participate);

    if (type === 'allParticipate') {
      numOfAllParticipate = this.getIntegerOf(value);
      const participateTypes = Object.keys(otherParticipate);
      for (let i = 0; i < participateTypes.length; i++) {
        if (numOfAllParticipate < otherParticipate[participateTypes[i]]) {
          formValidation[type] = false;
          this.setState({
            participateValidation: formValidation,
            isError: true,
          });
          return;
        }
        else {
          formValidation[participateTypes[i]] = true;
          this.setState({participateValidation: formValidation});
        }
      }
      this.setState({participateValidation: formValidation});
    }

    if (numOfAllParticipate < value) {
      formValidation[type] = false;
      this.setState({
        isError: true,
        participateValidation: formValidation,
      });
    }
    else {
      formValidation['allParticipate'] = true;
      formValidation[type] = true;
      this.setState({
        isError: parseInt(allParticipate) == 0 ? true : false,
        participateValidation: formValidation,
      });
    }
  };

  getBorderColor = (type) => {
    const {participateValidation} = this.state;
    if (!participateValidation[type])
      return 'red';

    return '';
  }

  getInvalidMessage = (type) => {
    const {translations} = this.context;
    const {participateValidation} = this.state;
    let message = '';
    if (!participateValidation[type]) {
      let messageDetail = translations['mustNotBeGreaterThanTotalParticipate'];
      if (type === 'allParticipate')
        messageDetail = translations['mustNotBeLessThanOtherParticipateType'];

      message = translations[type] + ' ' + messageDetail;
    }
    return message;
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
    } = this.state;

    return (
      <View style={{marginTop: 30}}>
        <TextFieldInput
          value={allParticipate}
          label={translations['allParticipate']}
          placeholder={translations['enterNumberOfParticipate']}
          fieldName="allParticipate"
          onChangeText={this.onChangeText}
          isSecureEntry={false}
          keyboardType="number-pad"
          maxLength={2}
          borderColor={this.getBorderColor('allParticipate')}
          message={this.getInvalidMessage('allParticipate')}
          isRequire={true}
        />
        <TextFieldInput
          value={female}
          label={translations['female']}
          placeholder={translations['enterNumberOfFemale']}
          fieldName="female"
          onChangeText={this.onChangeText}
          isSecureEntry={false}
          keyboardType="number-pad"
          maxLength={2}
          borderColor={this.getBorderColor('female')}
          message={this.getInvalidMessage('female')}
        />
        <TextFieldInput
          value={disability}
          label={translations['disability']}
          placeholder={translations['enterNumberOfDisability']}
          fieldName="disability"
          onChangeText={this.onChangeText}
          isSecureEntry={false}
          keyboardType="number-pad"
          maxLength={2}
          borderColor={this.getBorderColor('disability')}
          message={this.getInvalidMessage('disability')}
        />
        <TextFieldInput
          value={minority}
          label={translations['minority']}
          placeholder={translations['enterNumberOfMinority']}
          fieldName="minority"
          onChangeText={this.onChangeText}
          isSecureEntry={false}
          keyboardType="number-pad"
          maxLength={2}
          borderColor={this.getBorderColor('minority')}
          message={this.getInvalidMessage('minority')}
        />
        <TextFieldInput
          value={poor}
          label={translations['poor']}
          placeholder={translations['enterNumberOfPoor']}
          fieldName="poor"
          onChangeText={this.onChangeText}
          isSecureEntry={false}
          keyboardType="number-pad"
          maxLength={2}
          borderColor={this.getBorderColor('poor')}
          message={this.getInvalidMessage('poor')}
        />
        <TextFieldInput
          value={youth}
          label={translations['youth']}
          placeholder={translations['enterNumberOfYouth']}
          fieldName="youth"
          onChangeText={this.onChangeText}
          isSecureEntry={false}
          keyboardType="number-pad"
          maxLength={2}
          borderColor={this.getBorderColor('youth')}
          message={this.getInvalidMessage('youth')}
        />
      </View>
    );
  };

  renderSaveButton = () => {
    // if (!this.state.isError) {
      const {translations} = this.context;
      return (
        <ActionButton
          label={translations['next']}
          onPress={() => this.save()}
          isDisabled={this.state.isLoading}
          customButtonStyle={{marginTop: 20}}
        />
      );
    // }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
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
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  }
});

export default ParticipateInformation;
