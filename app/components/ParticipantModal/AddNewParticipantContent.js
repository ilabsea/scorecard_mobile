import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {LocalizationContext} from '../Translations';
import ParticipantForm from '../AddNewParticipant/ParticipantForm';
import BottomSheetModalTitle from '../BottomSheetModalTitle';
import FormBottomSheetButton from '../FormBottomSheetModal/FormBottomSheetButton';

import {saveParticipantInfo} from '../../services/participant_service';
import {saveParticipant} from '../../actions/participantAction';
import {connect} from 'react-redux';

import Color from '../../themes/color';
import styles from '../../themes/participantListItemStyle';
import { containerPadding } from '../../utils/responsive_util';
import { bodyFontSize } from '../../utils/font_size_util';
import uuidv4 from '../../utils/uuidv4';
import toastMessageUtil from '../../utils/toast_message_util';
import { MALE } from '../../constants/participant_constant';
import { participantContentHeight } from '../../constants/modal_constant';
import participantHelper from '../../helpers/participant_helper';

class AddNewParticipantContent extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.ageRef = React.createRef();

    const {age, gender, disability, minority, poor, youth} = participantHelper.getDefaultParticipantInfo(props.selectedParticipant);

    this.state = {
      age: age,
      selectedGender: gender,
      isDisability: disability,
      isMinority: minority,
      isPoor: poor,
      isYouth: youth,
      isValidAge: age > 0
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
        updateNewState={this.updateNewState}
        updateValidationStatus={this.updateValidationStatus}
        containerStyle={{paddingBottom: 65, paddingTop: 0}}
        renderSmallSize={true}
        isUpdate={!!this.props.selectedParticipant}
        participant={participant}
      />
    );
  };

  save = () => {
    const {age, selectedGender, isDisability, isMinority, isPoor, isYouth} = this.state;
    const isUpdate = !!this.props.selectedParticipant;
    let attrs = {
      uuid: this.props.selectedParticipant ? this.props.selectedParticipant.uuid : uuidv4(),
      age: parseInt(age),
      gender: selectedGender,
      disability: isDisability,
      minority: isMinority,
      poor: isPoor,
      youth: isYouth,
      scorecard_uuid: this.props.scorecardUuid,
      order: isUpdate ? this.props.selectedParticipant.order : 0,
    };

    saveParticipantInfo(attrs, this.props.scorecardUuid, isUpdate, (participants, participant) => {
      this.props.saveParticipant(participants, this.props.scorecardUuid);
      this.resetFormData();

      setTimeout(() => {
        !!this.props.onSaveParticipant && this.props.onSaveParticipant(participant);
        const message = isUpdate ? this.context.translations.successfullyUpdatedParticipant : this.context.translations.successfullyCreatedParticipant;
        toastMessageUtil.showMessage(message);
      }, 50);
    });
  }

  render() {
    const {translations} = this.context;

    return (
      <View style={{backgroundColor: Color.whiteColor, height: hp(participantContentHeight)}}>
        <BottomSheetModalTitle title={ !!this.props.title ? this.props.title : translations.proposedIndicator } />

        <View style={{padding: containerPadding, flex: 1}}>
          <Text style={[styles.header, {marginBottom: 10, fontSize: bodyFontSize()}]}>
            { !!this.props.subTitle ? this.props.subTitle : translations.addNewParticipant }
          </Text>
          {this.renderForm()}
        </View>

        <FormBottomSheetButton isValid={this.state.isValidAge} save={() => this.save()} />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {saveParticipant: (participants, scorecardUUID) => dispatch(saveParticipant(participants, scorecardUUID))};
}

export default connect(
  null,
  mapDispatchToProps,
)(AddNewParticipantContent);