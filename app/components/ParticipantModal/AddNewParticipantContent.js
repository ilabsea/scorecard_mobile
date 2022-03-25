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
import { MALE } from '../../constants/participant_constant';
import { participantContentHeight } from '../../constants/modal_constant';

class AddNewParticipantContent extends Component {
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
        containerStyle={{paddingBottom: 65, paddingTop: 0}}
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

      setTimeout(() => {
        !!this.props.onSaveParticipant && this.props.onSaveParticipant(participant);
      }, 50);
    });
  }

  render() {
    const {translations} = this.context;

    return (
      <View style={{backgroundColor: Color.whiteColor, height: hp(participantContentHeight)}}>
        <BottomSheetModalTitle title={ !!this.props.title ? this.props.title : translations.proposedIndicator } />

        <View style={{padding: containerPadding, flex: 1}}>
          <Text style={[styles.header, {marginBottom: 10, fontSize: bodyFontSize()}]}>{translations.addNewParticipant}</Text>
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