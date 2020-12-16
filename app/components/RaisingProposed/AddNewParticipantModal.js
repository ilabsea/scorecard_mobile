import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ScrollView} from 'react-native';
import { Modal, Portal, Button } from 'react-native-paper';
import {LocalizationContext} from '../Translations';
import {FontSize, FontFamily} from '../../assets/stylesheets/theme/font';
import realm from '../../db/schema';
import TextFieldInput from '../TextFieldInput';
import SelectPicker from '../SelectPicker';
import uuidv4 from '../../utils/uuidv4';
import Color from '../../themes/color';

import {saveParticipant} from '../../actions/participantAction';
import {connect} from 'react-redux';

class AddNewParticipantModal extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.ageRef = React.createRef();
    this.state = {
      age: 0,
      selectedGender: 'female',
      isDisability: 'false',
      isMinority: 'false',
      isPoor: 'false',
      isYouth: 'false',
    };
  }

  resetFormData = () => {
    this.setState({
      age: 0,
      selectedGender: 'female',
      isDisability: 'false',
      isMinority: 'false',
      isPoor: 'false',
      isYouth: 'false',
    });
  }

  onChangeValue = (fieldName, value) => {
    const newState = {};
    newState[fieldName] = value;
    this.setState(newState);
  };

  renderForm = () => {
    const {translations} = this.context;
    const {age, selectedGender, isDisability, isMinority, isPoor, isYouth} = this.state;
    const gender = [
      {label: translations.female, value: 'female'},
      {label: translations.male, value: 'male'},
      {label: translations.otherGender, value: 'other'},
    ];
    const choices = [
      {label: translations.optionNo, value: 'false'},
      {label: translations.optionYes, value: 'true'},
    ];
    return (
      <View style={{paddingBottom: 160, paddingTop: 5}}>
        <TextFieldInput
          ref={this.ageRef}
          value={age.toString()}
          isRequire={true}
          label={translations['age']}
          placeholder={translations['enterAge']}
          fieldName="age"
          onChangeText={this.onChangeValue}
          isSecureEntry={false}
          maxLength={2}
          keyboardType="number-pad"
        />
        <SelectPicker
          items={gender}
          selectedItem={selectedGender}
          label={translations['gender']}
          zIndex={9000}
          onChangeItem={(text) =>
            this.onChangeValue('selectedGender', text.value)
          }
          customDropDownContainerStyle={{marginTop: -10}}
        />
        <SelectPicker
          items={choices}
          selectedItem={isDisability}
          label={translations['disability']}
          zIndex={8000}
          onChangeItem={(text) =>
            this.onChangeValue('isDisability', text.value)
          }
        />
        <SelectPicker
          items={choices}
          selectedItem={isMinority}
          label="Minority"
          zIndex={7000}
          onChangeItem={(text) => this.onChangeValue('isMinority', text.value)}
        />
        <SelectPicker
          items={choices}
          selectedItem={isPoor}
          label={translations['poor']}
          zIndex={6000}
          onChangeItem={(text) => this.onChangeValue('isPoor', text.value)}
        />
        <SelectPicker
          items={choices}
          selectedItem={isYouth}
          label={translations['youth']}
          zIndex={5000}
          onChangeItem={(text) => this.onChangeValue('isYouth', text.value)}
        />
      </View>
    );
  };

  isValidAge = () => {
    if (this.ageRef.current === null)
      return this.state.age != '' && this.state.age != 0;

    return this.ageRef.current.state.isValid;
  }

  getTrueFalseValue = (value) => {
    return value === 'false' ? false : true;
  }

  save = () => {
    let participants = realm.objects('Participant').filtered('scorecard_uuid = "'+ this.props.scorecardUuid +'"').sorted('order', false);
    const {age, selectedGender, isDisability, isMinority, isPoor, isYouth} = this.state;
    let attrs = {
      uuid: uuidv4(),
      age: parseInt(age),
      gender: selectedGender,
      disability: this.getTrueFalseValue(isDisability),
      minority: this.getTrueFalseValue(isMinority),
      poor: this.getTrueFalseValue(isPoor),
      youth: this.getTrueFalseValue(isYouth),
      scorecard_uuid: this.props.scorecardUuid,
      order: participants.length,
    };
    realm.write(() => {
      let participant = realm.create('Participant', attrs);

      this.props.saveParticipant(participants, this.props.scorecardUuid);
      this.resetFormData();
      this.props.onDismiss();

      !!this.props.onSaveParticipant && this.props.onSaveParticipant(participant);
    });
  }

  closeModal = () => {
    this.resetFormData();
    this.props.onClose();
  }

  render() {
    const {translations} = this.context;
    return (
      <Portal>
        <Modal visible={this.props.visible} onDismiss={() => this.props.onDismiss()} contentContainerStyle={ styles.container }>
          <Text style={styles.header}>{translations.addNewParticipant}</Text>

          <ScrollView style={{marginBottom: 30}}>
            {this.renderForm()}
          </ScrollView>

          <View style={styles.btnWrapper}>
            <Button mode="contained" labelStyle={{color: '#fff', paddingTop: 2}} onPress={() => this.closeModal()}>{translations.close}</Button>
            <Button mode="outlined" onPress={() => this.save()} disabled={!this.isValidAge()}
              style={[styles.btnSave, this.isValidAge() ? {borderColor: Color.primaryButtonColor} : {}]}>
              {translations.save}
            </Button>
          </View>
        </Modal>
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    height: 650,
    marginHorizontal: 30,
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 24,
    fontFamily: FontFamily.title,
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btnSave: {
    marginLeft: 20,
    borderWidth: 2,
  }
});

function mapDispatchToProps(dispatch) {
  return {saveParticipant: (participants, scorecardUUID) => dispatch(saveParticipant(participants, scorecardUUID))};
}

export default connect(
  null,
  mapDispatchToProps,
)(AddNewParticipantModal);
