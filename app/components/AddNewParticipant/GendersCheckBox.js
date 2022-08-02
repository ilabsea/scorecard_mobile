import React, { Component } from 'react';
import { View, Text } from 'react-native';

import {LocalizationContext} from '../Translations';
import SelectBox from './SelectBox';
import GenderIcon from '../Share/GenderIcon';

import participantHelper from '../../helpers/participant_helper';
import uuidv4 from '../../utils/uuidv4'
import { MALE, genders } from '../../constants/participant_constant';

import {
  mdTabletGenderIconSize,
  smTabletGenderIconSize,
} from '../../styles/tablet/SelectBoxComponentStyle';
import {
  mdMobileGenderIconSize,
  smMobileGenderIconSize,
} from '../../styles/mobile/SelectBoxComponentStyle';

import { bodyFontSize } from '../../utils/font_size_util';
import { getDeviceStyle } from '../../utils/responsive_util';

const mdGenderIconSize= getDeviceStyle(mdTabletGenderIconSize, mdMobileGenderIconSize);
const smGenderIconSize = getDeviceStyle(smTabletGenderIconSize, smMobileGenderIconSize);

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
    const isSelected = gender == this.state.selectedGender;
    const iconSize = this.props.renderSmallSize ? smGenderIconSize : mdGenderIconSize;

    return <GenderIcon gender={gender}
              color={participantHelper.getItemColor(isSelected, 'text', this.props.disabled)}
              size={iconSize}
              otherIconSize={iconSize - 11}
              containerStyle={{width: 60}}
              otherIconContainerStyle={{marginTop: 11, marginBottom: 2}}
              questionIconStyle={{ top: -16, left: -4 }}
            />
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
        <View key={uuidv4()} style={{flex: 1, alignItems: 'center'}}>
          <SelectBox
            onPress={() => this.onPress(gender)}
            selectedItem={this.state.selectedGender}
            value={gender}
            label={ gender == 'other' ? translations.otherGender : translations[gender] }
            isSelected={gender === this.state.selectedGender}
            renderSmallSize={this.props.renderSmallSize}
            disabled={this.props.disabled}
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
        <Text style={{marginBottom: 10, fontSize: bodyFontSize()}}>
          { translations.gender }
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          { this._renderCheckBoxes() }
        </View>
      </View>
    );
  }
}

export default GendersCheckBox;