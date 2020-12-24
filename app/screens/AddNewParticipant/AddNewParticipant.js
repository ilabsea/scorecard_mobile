import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import {LocalizationContext} from '../../components/Translations';
import BottomButton from '../../components/BottomButton';
import HeaderTitle from '../../components/HeaderTitle';
import ParticipantForm from '../../components/AddNewParticipant/ParticipantForm';
import uuidv4 from '../../utils/uuidv4';

import {getParticipantInfo, saveParticipantInfo} from '../../services/participant_service';

import {saveParticipant} from '../../actions/participantAction';
import {connect} from 'react-redux';
class AddNewParticipant extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.ageRef = React.createRef();
    this.savedParticipant = null;

    if (this.props.route.params.participant_uuid != null)
      this.savedParticipant = getParticipantInfo(this.props.route.params.scorecard_uuid, this.props.route.params.participant_uuid);

    this.state = {
      isUpdate: this.savedParticipant != undefined ? true : false,
      age: this.savedParticipant != undefined ? this.savedParticipant.age : 0,
      selectedGender: this.savedParticipant != undefined ? this.savedParticipant.gender : 'female',
      isDisability: this.savedParticipant != undefined ? this.savedParticipant.disability.toString() : 'false',
      isMinority: this.savedParticipant != undefined ? this.savedParticipant.minority.toString() : 'false',
      isPoor: this.savedParticipant != undefined ? this.savedParticipant.poor.toString() : 'false',
      isYouth: this.savedParticipant != undefined ? this.savedParticipant.youth.toString() : 'false',
      isValidAge: this.savedParticipant != undefined ? true : false,
    };
  }

  updateNewState = (newState) =>  {
    this.setState(newState);
  }

  updateValidationStatus = (isValid) => {
    this.setState({
      isValidAge: isValid,
    })
  }

  renderForm = () => {
    const participant = {
      age: this.state.age,
      selectedGender: this.state.selectedGender,
      isDisability: this.state.isDisability,
      isMinority: this.state.isMinority,
      isPoor: this.state.isPoor,
      isYouth: this.state.isYouth,
    }

    return (
      <ParticipantForm
        isUpdate={this.state.isUpdate}
        participant={participant}
        updateNewState={this.updateNewState}
        updateValidationStatus={this.updateValidationStatus}
        containerStyle={{marginTop: 20, marginBottom: 60}}
      />
    );
  };

  renderSaveButton = () => {
    const {translations} = this.context;

    return (
      <View style={styles.buttonContainer}>
        <BottomButton disabled={!this.state.isValidAge} onPress={() => this.saveParticipant()} label={translations['save']} />
      </View>
    );
  }

  getTrueFalseValue = (value) => {
    return value === 'false' ? false : true;
  }

  saveParticipant = () => {
    const {scorecard_uuid, participant_uuid, index} = this.props.route.params;
    const {age, selectedGender, isDisability, isMinority, isPoor, isYouth, isUpdate} = this.state;
    let participant = {
      uuid: isUpdate ? participant_uuid : uuidv4(),
      age: parseInt(age),
      gender: selectedGender,
      disability: this.getTrueFalseValue(isDisability),
      minority: this.getTrueFalseValue(isMinority),
      poor: this.getTrueFalseValue(isPoor),
      youth: this.getTrueFalseValue(isYouth),
      scorecard_uuid: this.props.route.params.scorecard_uuid,
      order: isUpdate ? index : 0,
    };

    saveParticipantInfo(participant, scorecard_uuid, this.state.isUpdate, (participants, participant) => {
      this.props.saveParticipant(participants, this.props.route.params.scorecard_uuid);
      this.props.navigation.goBack();
    });
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