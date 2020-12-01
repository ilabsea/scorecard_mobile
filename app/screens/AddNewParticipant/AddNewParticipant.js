import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView} from 'react-native';

import realm from '../../db/schema';
import {LocalizationContext} from '../../components/Translations';
import TextFieldInput from '../../components/TextFieldInput';
import SelectPicker from '../../components/SelectPicker';
import ActionButton from '../../components/ActionButton';
import Color from '../../themes/color';
import uuidv4 from '../../utils/uuidv4';

import {saveParticipant} from '../../actions/participantAction';
import {connect} from 'react-redux';
class AddNewParticipant extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.ageRef = React.createRef();
    this.state = {
      isUpdate: false,
      age: 0,
      selectedGender: 'female',
      isDisability: 'false',
      isMinority: 'false',
      isPoor: 'false',
      isYouth: 'false',
      gender: [
        {label: 'Female', value: 'female'},
        {label: 'Male', value: 'male'},
        {label: 'Other', value: 'other'},
      ],
      choices: [
        {label: 'No', value: 'false'},
        {label: 'Yes', value: 'true'},
      ],
    };
  }

  componentDidMount() {
    if (this.props.route.params.participant_uuid != null) {
      const participant = realm.objects('Participant').filtered('scorecard_uuid = "'+ this.props.route.params.scorecard_uuid +'" AND uuid ="'+ this.props.route.params.participant_uuid +'"')[0];
      this.setParticipantInfo(participant);
      this.setState({isUpdate: participant != undefined ? true : false});
    }
  }

  setParticipantInfo = (participant) => {
    this.setState({
      age: participant.age,
      selectedGender: participant.gender,
      isDisability: participant.disability.toString(),
      isMinority: participant.minority.toString(),
      isPoor: participant.poor.toString(),
      isYouth: participant.youth.toString(),
    });
  }

  onChangeValue = (fieldName, value) => {
    const newState = {};
    newState[fieldName] = value;
    this.setState(newState);
  };

  renderForm = () => {
    const {translations} = this.context;
    const {age, gender, selectedGender, choices, isDisability, isMinority, isPoor, isYouth} = this.state;
    return (
      <View style={{marginTop: 20}}>
        <TextFieldInput
          ref={this.ageRef}
          value={age.toString()}
          isRequire={true}
          label={translations['age']}
          searchable={false}
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
          searchable={false}
          zIndex={9000}
          customLabelStyle={{zIndex: 9001}}
          showCustomArrow={true}
          onChangeItem={(text) =>
            this.onChangeValue('selectedGender', text.value)
          }
          mustHasDefaultValue={false}
          customDropDownContainerStyle={{marginTop: -10}}
        />
        <SelectPicker
          items={choices}
          selectedItem={isDisability}
          label={translations['disability']}
          searchable={false}
          zIndex={8000}
          customLabelStyle={{zIndex: 8001}}
          showCustomArrow={true}
          onChangeItem={(text) =>
            this.onChangeValue('isDisability', text.value)
          }
          mustHasDefaultValue={false}
        />
        <SelectPicker
          items={choices}
          selectedItem={isMinority}
          label="Minority"
          searchable={false}
          zIndex={7000}
          customLabelStyle={{zIndex: 7001}}
          showCustomArrow={true}
          onChangeItem={(text) => this.onChangeValue('isMinority', text.value)}
          mustHasDefaultValue={false}
        />
        <SelectPicker
          items={choices}
          selectedItem={isPoor}
          label={translations['poor']}
          searchable={false}
          zIndex={6000}
          customLabelStyle={{zIndex: 6001}}
          showCustomArrow={true}
          onChangeItem={(text) => this.onChangeValue('isPoor', text.value)}
          mustHasDefaultValue={false}
        />
        <SelectPicker
          items={choices}
          selectedItem={isYouth}
          label={translations['youth']}
          searchable={false}
          zIndex={5000}
          customLabelStyle={{zIndex: 5001}}
          showCustomArrow={true}
          onChangeItem={(text) => this.onChangeValue('isYouth', text.value)}
          mustHasDefaultValue={false}
        />
      </View>
    );
  };

  isValidAge = () => {
    if (this.ageRef.current === null)
      return this.state.age != '' && this.state.age != 0;

    return this.ageRef.current.state.isValid;
  }

  renderSaveButton = () => {
    const {translations} = this.context;
    if (this.isValidAge()) {
      return (
        <View style={styles.buttonContainer}>
          <ActionButton
            onPress={() => this.saveParticipant()}
            label={translations['save']}
            customBackgroundColor={Color.primaryButtonColor}
          />
        </View>
      );
    }
  }

  getTrueFalseValue = (value) => {
    return value === 'false' ? false : true;
  }

  saveParticipant = () => {
    let participants = realm.objects('Participant').filtered('scorecard_uuid = "'+ this.props.route.params.scorecard_uuid +'"').sorted('order', false);
    const {age, selectedGender, isDisability, isMinority, isPoor, isYouth, isUpdate} = this.state;
    let attrs = {
      uuid: isUpdate ? this.props.route.params.participant_uuid : uuidv4(),
      age: parseInt(age),
      gender: selectedGender,
      disability: this.getTrueFalseValue(isDisability),
      minority: this.getTrueFalseValue(isMinority),
      poor: this.getTrueFalseValue(isPoor),
      youth: this.getTrueFalseValue(isYouth),
      scorecard_uuid: this.props.route.params.scorecard_uuid,
      order: !isUpdate ? participants.length : this.props.route.params.index,
    };

    realm.write(() => {
      if (!isUpdate)
        realm.create('Participant', attrs);
      else
        realm.create('Participant', attrs, 'modified');
    });
    this.props.saveParticipant(participants, this.props.route.params.scorecard_uuid);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={{flex: 1, backgroundColor: '#ffffff', padding: 20}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              Recored New User
            </Text>
            <Text style={{fontSize: 18, color: '#2e2e2e'}}>
              Please fill information below
            </Text>
            {this.renderForm()}
            {this.renderSaveButton()}
          </View>
          </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 16,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
});

function mapDispatchToProps(dispatch) {
  return {saveParticipant: (participants, scorecardUUID) => dispatch(saveParticipant(participants, scorecardUUID))};
}

export default connect(null, mapDispatchToProps)(AddNewParticipant);
