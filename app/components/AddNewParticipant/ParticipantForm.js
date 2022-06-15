import React, {Component} from 'react';
import {View, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';

import {LocalizationContext} from '../Translations';
import NumericInput from '../NumericInput';
import { getIntegerOf } from '../../utils/math';
import uuidv4 from '../../utils/uuidv4'
import { MALE } from '../../constants/participant_constant';
import participantHelper from '../../helpers/participant_helper';

import GendersCheckBox from './GendersCheckBox';
import OptionsSelectBox from './OptionsSelectBox';

import { bodyFontSize } from '../../utils/font_size_util';

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

    if (fieldName == 'age') {
      const isYouth = participantHelper.isYouth(value);
      newState['isYouth'] = isYouth;
      this.setState({ isYouth: isYouth });
    }

    this.props.updateNewState(newState);
  };

  _renderParticipantAttributes = () => {
    const { translations } = this.context;
    const attributes = {
      firstRow: [
        { iconName: 'wheelchair', fieldName: 'isDisability', isSelected: this.state.isDisability, title: translations.disability },
        { iconName: 'users', fieldName: 'isMinority', isSelected: this.state.isMinority, title: translations.minority },
        { iconName: 'id-card-o', fieldName: 'isPoor', isSelected: this.state.isPoor, title: translations.poor },,
      ]
    }

    let doms = [];
    for (let key in attributes) {
      doms.push(
        <View key={uuidv4()} style={{flexDirection: 'row', marginTop: 10, justifyContent: 'space-between'}}>
          {
            attributes[key].map((attribute) => {
              if (attribute == null)
                return (<View key={uuidv4()} style={{flex: 1}} />)

              return (
                <View key={uuidv4()} style={{ marginBottom: 10, flex: 1, alignItems: 'center' }}>
                  <OptionsSelectBox
                    title={attribute.title}
                    iconName={attribute.iconName}
                    fieldName={attribute.fieldName}
                    onChangeValue={this.onChangeValue}
                    isSelected={attribute.isSelected}
                    renderSmallSize={this.props.renderSmallSize}
                  />
                </View>
              )
            })
          }
        </View>
      )
    }

    return doms;
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
          />

          <GendersCheckBox
            onChangeValue={this.onChangeValue}
            selectedGender={this.state.selectedGender}
            renderSmallSize={this.props.renderSmallSize}
          />

          <Text style={{marginTop: 15, fontSize: bodyFontSize()}}>
            { translations.attributes }
          </Text>
          { this._renderParticipantAttributes() }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ParticipantForm;