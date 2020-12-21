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
          label={translations['minority']}
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

  renderSaveButton = () => {
    const {translations} = this.context;

    return (
      <View style={styles.buttonContainer}>
        <BottomButton disabled={!this.isValidAge()} onPress={() => this.saveParticipant()} label={translations['save']} />
      </View>
    );
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
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
          <HeaderTitle
            headline="participantInformation"
            subheading="pleaseFillInformationBelow"
          />
          {this.renderForm()}
        </ScrollView>
        {this.renderSaveButton()}
      </View>
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
    padding: 20
  },
});

function mapDispatchToProps(dispatch) {
  return {saveParticipant: (participants, scorecardUUID) => dispatch(saveParticipant(participants, scorecardUUID))};
}

export default connect(null, mapDispatchToProps)(AddNewParticipant);
