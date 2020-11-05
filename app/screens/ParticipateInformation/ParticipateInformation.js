import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native';

import realm from '../../db/schema';
import {LocalizationContext} from '../../components/Translations';
import HeaderTitle from '../../components/HeaderTitle';
import TextFieldInput from '../../components/TextFieldInput';
import ActionButton from '../../components/ActionButton';
import validationService from '../../services/validation_service';

class ParticipateInformation extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      allParticipate: 0,
      female: 0,
      disability: 0,
      minority: 0,
      poor: 0,
      youth: 0,
      allParticipateErrorMsg: '',
      femaleErrorMsg: '',
      disabilityErrorMsg: '',
      minorityErrorMsg: '',
      poortErrorMsg: '',
      youthErrorMsg: '',
    };
  }

  onChangeText = (type, value) => {
    if (type === 'allParticipate')
      this.setState({
        allParticipate: value,
        allParticipateErrorMsg: '',
      });
  };

  renderFormInput = () => {
    const {translations} = this.context;
    const {
      allParticipate,
      female,
      disability,
      minority,
      poor,
      youth,
      allParticipateErrorMsg,
      femaleErrorMsg,
      disabilityErrorMsg,
      minorityErrorMsg,
      poorErrorMsg,
      youthErrorMsg,
    } = this.state;

    return (
      <View style={{marginTop: 30}}>
        <TextFieldInput
          value={allParticipate}
          label={translations['allParticipate']}
          placeholder={translations['enterNumberOfParticipate']}
          fieldName="allParticipate"
          onChangeText={this.onChangeText}
          message={translations[allParticipateErrorMsg]}
          isSecureEntry={false}
          keyboardType="number-pad"
        />
        <TextFieldInput
          value={female}
          label={translations['female']}
          placeholder={translations['enterNumberOfFemale']}
          fieldName="female"
          onChangeText={this.onChangeText}
          message={translations[femaleErrorMsg]}
          isSecureEntry={false}
          keyboardType="number-pad"
        />
        <TextFieldInput
          value={disability}
          label={translations['disability']}
          placeholder={translations['enterNumberOfDisability']}
          fieldName="disability"
          onChangeText={this.onChangeText}
          message={translations[disabilityErrorMsg]}
          isSecureEntry={false}
          keyboardType="number-pad"
        />
        <TextFieldInput
          value={minority}
          label={translations['ethnicMinority']}
          placeholder={translations['enterNumberOfMinority']}
          fieldName="minority"
          onChangeText={this.onChangeText}
          message={translations[minorityErrorMsg]}
          isSecureEntry={false}
          keyboardType="number-pad"
        />
        <TextFieldInput
          value={poor}
          label={translations['poor']}
          placeholder={translations['enterNumberOfPoor']}
          fieldName="poor"
          onChangeText={this.onChangeText}
          message={translations[poorErrorMsg]}
          isSecureEntry={false}
          keyboardType="number-pad"
        />
        <TextFieldInput
          value={youth}
          label={translations['youth']}
          placeholder={translations['enterNumberOfYouth']}
          fieldName="youth"
          onChangeText={this.onChangeText}
          message={translations[youthErrorMsg]}
          isSecureEntry={false}
          keyboardType="number-pad"
        />
      </View>
    );
  };

  render() {
    const {translations} = this.context;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <HeaderTitle
            headline="facilitatorList"
            subheading="pleaseFillInformationBelow"
          />
          {this.renderFormInput()}
          <ActionButton
            label={translations['next']}
            onPress={() => this.save()}
            isDisabled={this.state.isLoading}
            customButtonStyle={{marginTop: 20}}
          />
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
