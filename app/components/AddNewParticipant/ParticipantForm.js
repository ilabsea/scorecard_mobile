import React, {Component} from 'react';
import {View, TouchableWithoutFeedback, Keyboard} from 'react-native';

import {LocalizationContext} from '../Translations';
import NumericInput from '../Share/NumericInput';
import AttributeSelectBoxes from './AttributeSelectBoxes';
import AnonymousSelectBox from './AnonymousSelectBox';
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
      anonymous: false,
    };
  }

  componentDidMount() {
    if (this.props.isUpdate) {
      this.setState(this.props.participant);
    }
  }

  onAnonymousChange = (fieldName, anonymous) => {
    const newState = {
      age: anonymous ? -1 : 0,
      selectedGender: 'other',
      isDisability: false,
      isMinority: false,
      isPoor: false,
      isYouth: false,
      anonymous: anonymous
    };
    this.setState(newState);
    this.props.updateNewState(newState);
    this.props.updateValidationStatus(anonymous);
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
              disabled={this.state.anonymous}
              onChange={this.onChangeValue}
           />
  }

  _renderAnonymousOption = () => {
    if (participantHelper.isAnonymousOptionInvisible(this.props.scorecardUuid) || this.props.isUpdate)
      return;

    return <AnonymousSelectBox
              value={this.state.anonymous}
              onChange={this.onAnonymousChange}
              renderSmallSize={this.props.renderSmallSize}
           />
  }

  renderAgeTextInput() {
    const {translations} = this.context;
    return <NumericInput
              value={this.state.age.toString()}
              label={`${translations['age']} * ${this.state.anonymous ? `(${translations.anonymousCannotChoose})` : ''}`}
              placeholder={translations['enterAge']}
              onChangeText={(value) => {
                this.onChangeValue('age', value);
                this.props.updateValidationStatus(getIntegerOf(value) > 0);
              }}
              isRequired={true}
              requiredMessage={translations.pleaseEnterTheAge}
              disabled={this.state.anonymous}
           />
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={this.props.containerStyle}>
          { this.renderAgeTextInput() }
          <GenderSelectBoxes
            onChangeValue={this.onChangeValue}
            selectedGender={this.state.selectedGender}
            renderSmallSize={this.props.renderSmallSize}
            disabled={this.state.anonymous}
          />

          { this._renderParticipantAttributes() }
          { this._renderAnonymousOption() }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ParticipantForm;