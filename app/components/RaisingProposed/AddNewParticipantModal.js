import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Modal, Portal, Button } from 'react-native-paper';
import {LocalizationContext} from '../Translations';
import {FontSize, FontFamily} from '../../assets/stylesheets/theme/font';
import ParticipantForm from '../AddNewParticipant/ParticipantForm';
import uuidv4 from '../../utils/uuidv4';
import Color from '../../themes/color';

import {saveParticipantInfo} from '../../services/participant_service';

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
      isValidAge: false,
    };
    this.controllers = new Array(5);
  }

  resetFormData = () => {
    this.setState({
      age: 0,
      selectedGender: 'female',
      isDisability: 'false',
      isMinority: 'false',
      isPoor: 'false',
      isYouth: 'false',
      isValidAge: false,
    });
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
    return (
      <ParticipantForm
        updateNewState={this.updateNewState}
        updateValidationStatus={this.updateValidationStatus}
        containerStyle={{paddingBottom: 160, paddingTop: 5}}
        controllers={this.controllers}
      />
    );
  };

  getTrueFalseValue = (value) => {
    return value === 'false' ? false : true;
  }

  save = () => {
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
      order: 0,
    };

    saveParticipantInfo(attrs, this.props.scorecardUuid, false, (participants, participant) => {
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

  onTouchWithoutFeedback = () => {
    Keyboard.dismiss();
    this.controllers.map((controller) => {
      controller.close();
    });
  }

  render() {
    const {translations} = this.context;
    return (
      <Portal>
        <Modal visible={this.props.visible} onDismiss={() => this.props.onDismiss()} contentContainerStyle={ styles.container }>
          <TouchableWithoutFeedback onPress={() => this.onTouchWithoutFeedback()}>
            <View style={{backgroundColor: 'white', flex: 1}}>
              <Text style={styles.header}>{translations.addNewParticipant}</Text>

              <ScrollView style={{marginBottom: 30}}>
                {this.renderForm()}
              </ScrollView>

              <View style={styles.btnWrapper}>
                <Button mode="contained" labelStyle={{color: '#fff', paddingTop: 2}} onPress={() => this.closeModal()}>{translations.close}</Button>
                <Button
                  mode="outlined"
                  onPress={() => this.save()} disabled={!this.state.isValidAge}
                  style={[styles.btnSave, this.state.isValidAge ? {borderColor: Color.primaryButtonColor} : {}]}
                >
                  {translations.save}
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
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
