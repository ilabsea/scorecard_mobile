import React, {Component} from 'react';
import {View, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';

import {LocalizationContext} from '../Translations';
import NumericInput from '../NumericInput';
import { getIntegerOf } from '../../utils/math';
import { MALE } from '../../constants/participant_constant';

import GendersCheckBox from './GendersCheckBox';
import AttributesSelectBox from './AttributesSelectBox';

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
    };
  }

  componentDidMount() {
    if (this.props.isUpdate) {
      this.setState(this.props.participant);
    }
  }

  onChangeValue = (fieldName, value) => {
    const newState = {};
    newState[fieldName] = value;
    this.setState(newState);
    this.props.updateNewState(newState);
  };

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
          />

          <GendersCheckBox
            onChangeValue={this.onChangeValue}
            selectedGender={this.state.selectedGender}
            renderSmallSize={this.props.renderSmallSize}
          />

          <Text style={{marginTop: 15}}>
            { translations.attributes }
          </Text>

          <AttributesSelectBox
            onChangeValue={this.onChangeValue}
            renderSmallSize={this.props.renderSmallSize}
            participant={this.props.participant}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ParticipantForm;