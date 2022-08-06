import React, {Component} from 'react';
import {View, TouchableWithoutFeedback, Keyboard} from 'react-native';

import {LocalizationContext} from '../Translations';
import NumericInput from '../Share/NumericInput';
import AttributeSelectBoxes from './AttributeSelectBoxes';
import UncountableSelectBox from './UncountableSelectBox';
import GenderSelectBoxes from './GenderSelectBoxes';

import { getIntegerOf } from '../../utils/math';
import { MALE } from '../../constants/participant_constant';
import participantHelper from '../../helpers/participant_helper';

class ParticipantForm extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      isUpdate: false,
      age: 0,
      selectedGender: MALE,
      isDisability: false,
      isMinority: false,
      isPoor: false,
      isYouth: false,
      uncountable: false,
    };
  }

  componentDidMount() {
    if (this.props.isUpdate) {
      this.setState(this.props.participant);
    }
  }

  onUncountableChange = (fieldName, uncountable) => {
    const newState = {
      age: uncountable ? -1 : 0,
      selectedGender: 'other',
      isDisability: false,
      isMinority: false,
      isPoor: false,
      isYouth: false,
      uncountable: uncountable
    };
    this.setState(newState);
    this.props.updateNewState(newState);
    this.props.updateValidationStatus(uncountable);
  }

  onChangeValue = (fieldName, value) => {
    const newState = {};
    newState[fieldName] = value;
    this.setState(newState);

    if (fieldName == 'age') {
      const isYouth = participantHelper.isYouth(value);
      newState['isYouth'] = isYouth;
      this.setState({ isYouth: isYouth });
    }

    this.props.updateNewState(newState);
  };

  _renderParticipantAttributes = () => {
    return <AttributeSelectBoxes
              isDisability={this.state.isDisability}
              isMinority={this.state.isMinority}
              isPoor={this.state.isPoor}
              renderSmallSize={this.props.renderSmallSize}
              disabled={this.state.uncountable}
              onChange={this.onChangeValue}
           />
  }

  _renderUncountableOption = () => {
    if (participantHelper.isUncountableOptionInvisible(this.props.scorecardUuid) || this.props.isUpdate)
      return;

    return <UncountableSelectBox
              value={this.state.uncountable}
              onChange={this.onUncountableChange}
              renderSmallSize={this.props.renderSmallSize}
           />
  }

  render() {
    const {translations} = this.context;
    const {age} = this.state;

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={this.props.containerStyle}>
          <NumericInput
            value={age.toString()}
            label={`${translations['age']} *`}
            placeholder={translations['enterAge']}
            onChangeText={(value) => {
              this.onChangeValue('age', value);
              this.props.updateValidationStatus(getIntegerOf(value) > 0);
            }}
            isRequired={true}
            requiredMessage={translations.pleaseEnterTheAge}
            disabled={this.state.uncountable}
          />

          <GenderSelectBoxes
            onChangeValue={this.onChangeValue}
            selectedGender={this.state.selectedGender}
            renderSmallSize={this.props.renderSmallSize}
            disabled={this.state.uncountable}
          />

          { this._renderParticipantAttributes() }
          { this._renderUncountableOption() }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ParticipantForm;