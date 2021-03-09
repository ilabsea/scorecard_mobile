import React, { Component } from 'react';
import { View, Text } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {LocalizationContext} from '../Translations';
import SelectBox from './SelectBox';

import participantHelper from '../../helpers/participant_helper';
import uuidv4 from '../../utils/uuidv4'
import { MALE, genders } from '../../constants/participant_constant';

class GendersCheckBox extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.state = {
      selectedGender: MALE,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return { selectedGender: props.selectedGender };
  }

  _renderGenderIcon = (gender) => {
    const iconLabel = participantHelper.getGenderIconLabel(gender);
    const isSelected = gender == this.state.selectedGender;
    const iconsize = this.props.renderSmallSize ? 30 : 45;

    return (
      <FontAwesomeIcon name={iconLabel} size={iconsize} style={{paddingHorizontal: 10}}
        color={participantHelper.getItemColor(isSelected, 'text')}
      />
    );
  }

  onPress = (gender) => {
    this.setState({ selectedGender: gender }, () => {
      this.props.onChangeValue('selectedGender', gender);
    })
  }

  _renderCheckBoxes = () => {
    const { translations } = this.context;

    return genders.map((gender) => {
      return (
        <View style={{flex: 1, alignItems: 'center'}}>
          <SelectBox
            key={uuidv4()}
            onPress={() => this.onPress(gender)}
            selectedItem={this.state.selectedGender}
            value={gender}
            label={ gender == 'other' ? translations.otherGender : translations[gender] }
            isSelected={gender === this.state.selectedGender}
            renderSmallSize={this.props.renderSmallSize}
          >
            {this._renderGenderIcon(gender)}
          </SelectBox>
        </View>
      )
    });
  }

  render() {
    const { translations } = this.context;

    return (
      <View style={{ marginTop: -14 }}>
        <Text style={{marginBottom: 10}}>{ translations.gender }</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          { this._renderCheckBoxes() }
        </View>
      </View>
    );
  }
}

export default GendersCheckBox;