import React, {Component} from 'react';
import {View, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {LocalizationContext} from '../Translations';
import NumericInput from '../Share/NumericInput';
import { getIntegerOf } from '../../utils/math';
import uuidv4 from '../../utils/uuidv4'
import { getDeviceStyle } from '../../utils/responsive_util';
import { bodyFontSize } from '../../utils/font_size_util';
import { MALE } from '../../constants/participant_constant';
import participantHelper from '../../helpers/participant_helper';

import GendersCheckBox from './GendersCheckBox';
import OptionsSelectBox from './OptionsSelectBox';

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
    const { translations } = this.context;
    const attributes = {
      firstRow: [
        { iconName: 'wheelchair', fieldName: 'isDisability', isSelected: this.state.isDisability, title: translations.disability },
        { iconName: 'users', fieldName: 'isMinority', isSelected: this.state.isMinority, title: translations.minority },
        { iconName: 'id-card-o', fieldName: 'isPoor', isSelected: this.state.isPoor, title: translations.poor },
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
                    disabled={this.state.uncountable}
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

  _renderUncountableOption = () => {
    if (participantHelper.isUncountedOptionVisible(this.props.scorecardUuid) || this.props.isUpdate)
      return;

    return (
      <View>
        <Text style={{marginTop: 5, fontSize: bodyFontSize()}}>
          { this.context.translations.other } ({ this.context.translations.anonymous })
        </Text>

        <View style={{ marginTop: 8, paddingLeft: wp(getDeviceStyle('8.3%', '4.5%')) }}>
          <OptionsSelectBox
            title={ this.context.translations.anonymous }
            iconName='eye-off'
            iconType='material'
            fieldName='uncountable'
            onChangeValue={this.onUncountableChange}
            isSelected={this.state.uncountable}
            renderSmallSize={this.props.renderSmallSize}
          />
        </View>
      </View>
    )
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

          <GendersCheckBox
            onChangeValue={this.onChangeValue}
            selectedGender={this.state.selectedGender}
            renderSmallSize={this.props.renderSmallSize}
            disabled={this.state.uncountable}
          />

          <Text style={{marginTop: 15, fontSize: bodyFontSize()}}>
            { translations.attributes }
          </Text>
          { this._renderParticipantAttributes() }
          { this._renderUncountableOption() }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ParticipantForm;