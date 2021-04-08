import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TouchableWithoutFeedback} from 'react-native';

import {LocalizationContext} from '../../components/Translations';
import BottomButton from '../../components/BottomButton';
import HeaderTitle from '../../components/HeaderTitle';
import ParticipantForm from '../../components/AddNewParticipant/ParticipantForm';
import uuidv4 from '../../utils/uuidv4';
import { MALE } from '../../constants/participant_constant';

import {getParticipantInfo, saveParticipantInfo} from '../../services/participant_service';

import {saveParticipant} from '../../actions/participantAction';
import {connect} from 'react-redux';

import { containerPaddingTop, containerPadding } from '../../utils/responsive_util';
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
      selectedGender: this.savedParticipant != undefined ? this.savedParticipant.gender : MALE,
      isDisability: this.savedParticipant != undefined ? this.savedParticipant.disability : false,
      isMinority: this.savedParticipant != undefined ? this.savedParticipant.minority : false,
      isPoor: this.savedParticipant != undefined ? this.savedParticipant.poor : false,
      isYouth: this.savedParticipant != undefined ? this.savedParticipant.youth : false,
      isValidAge: !!this.savedParticipant,
    };
    this.controllers = new Array(5);
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
        containerStyle={{marginTop: 10, marginBottom: 60}}
        controllers={this.controllers}
        renderSmallSize={false}
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

  saveParticipant = () => {
    const {scorecard_uuid, participant_uuid, index} = this.props.route.params;
    const {age, selectedGender, isDisability, isMinority, isPoor, isYouth, isUpdate} = this.state;
    let participant = {
      uuid: isUpdate ? participant_uuid : uuidv4(),
      age: parseInt(age),
      gender: selectedGender,
      disability: isDisability,
      minority: isMinority,
      poor: isPoor,
      youth: isYouth,
      scorecard_uuid: this.props.route.params.scorecard_uuid,
      order: isUpdate ? index : 0,
    };

    saveParticipantInfo(participant, scorecard_uuid, this.state.isUpdate, (participants, participant) => {
      this.props.saveParticipant(participants, this.props.route.params.scorecard_uuid);
      this.props.navigation.goBack();
    });
  }

  closeAllSelectBox = () => {
    this.controllers.map((controller) => {
      controller.close();
    });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.closeAllSelectBox()}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          >
            <HeaderTitle
              headline="participantInformation"
              subheading="pleaseFillInformationBelow"
            />
            {this.renderForm()}
          </ScrollView>
          {this.renderSaveButton()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: containerPadding,
    paddingBottom: 28,
    paddingTop: containerPaddingTop,
  },
  buttonContainer: {
    padding: containerPadding
  },
});

function mapDispatchToProps(dispatch) {
  return {saveParticipant: (participants, scorecardUUID) => dispatch(saveParticipant(participants, scorecardUUID))};
}

export default connect(null, mapDispatchToProps)(AddNewParticipant);
