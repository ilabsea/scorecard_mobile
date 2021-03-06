import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import {LocalizationContext} from '../Translations';
import ParticipantForm from '../AddNewParticipant/ParticipantForm';
import uuidv4 from '../../utils/uuidv4';
import { MALE } from '../../constants/participant_constant';

import CloseButton from '../CloseButton';
import SaveButton from '../SaveButton';

import {saveParticipantInfo} from '../../services/participant_service';

import {saveParticipant} from '../../actions/participantAction';
import {connect} from 'react-redux';

import Color from '../../themes/color';
import styles from '../../themes/participantListItemStyle';
import { addNewParticipantModalHeight } from '../../utils/responsive_util';

class AddNewParticipantModal extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.ageRef = React.createRef();
    this.state = {
      age: 0,
      selectedGender: MALE,
      isDisability: false,
      isMinority: false,
      isPoor: false,
      isYouth: false,
      isValidAge: false,
    };
  }

  resetFormData = () => {
    this.setState({
      age: 0,
      selectedGender: MALE,
      isDisability: false,
      isMinority: false,
      isPoor: false,
      isYouth: false,
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
        containerStyle={{paddingBottom: 160, paddingTop: 0}}
        renderSmallSize={true}
      />
    );
  };

  save = () => {
    const {age, selectedGender, isDisability, isMinority, isPoor, isYouth} = this.state;
    let attrs = {
      uuid: uuidv4(),
      age: parseInt(age),
      gender: selectedGender,
      disability: isDisability,
      minority: isMinority,
      poor: isPoor,
      youth: isYouth,
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

  render() {
    const {translations} = this.context;
    return (
      <Portal>
        <Modal visible={this.props.visible}
          contentContainerStyle={[styles.container, { height: addNewParticipantModalHeight() }]}
        >
          <View style={{backgroundColor: Color.whiteColor, flex: 1}}>
            <Text style={[styles.header, {marginBottom: 10}]}>{translations.addNewParticipant}</Text>

            <ScrollView style={{marginBottom: 30}} scrollEnabled={false} showsVerticalScrollIndicator={false}>
              {this.renderForm()}
            </ScrollView>

            <View style={styles.btnWrapper}>
              <CloseButton
                onPress={() => this.closeModal()}
                label={translations.close}
              />

              <SaveButton
                disabled={!this.state.isValidAge}
                onPress={() => this.save()}
                label={translations.save}
              />
            </View>
          </View>
        </Modal>
      </Portal>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {saveParticipant: (participants, scorecardUUID) => dispatch(saveParticipant(participants, scorecardUUID))};
}

export default connect(
  null,
  mapDispatchToProps,
)(AddNewParticipantModal);
