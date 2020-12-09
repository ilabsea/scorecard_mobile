import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView} from 'react-native';

import realm from '../../db/schema';
import {LocalizationContext} from '../../components/Translations';
import TextFieldInput from '../../components/TextFieldInput';
import SelectPicker from '../../components/SelectPicker';
import BottomButton from '../../components/BottomButton';
import HeaderTitle from '../../components/HeaderTitle';
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
      <View style={{marginTop: 20, marginBottom: 60}}>
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
          label={translations['minority']}
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
          <BottomButton onPress={() => this.saveParticipant()} label={translations['save']} />
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
        <ScrollView contentContainerStyle={styles.container}>
          <HeaderTitle
            headline="participantInformation"
            subheading="pleaseFillInformationBelow"
          />
          {this.renderForm()}
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
    padding: 20,
    paddingBottom: 28,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

function mapDispatchToProps(dispatch) {
  return {saveParticipant: (participants, scorecardUUID) => dispatch(saveParticipant(participants, scorecardUUID))};
}

export default connect(null, mapDispatchToProps)(AddNewParticipant);
