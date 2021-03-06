import React, { Component } from 'react';
import { View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import SelectBox from './SelectBox';
import participantHelper from '../../helpers/participant_helper';

import {
  mdTabletIconSize,
  smTabletIconSize
} from '../../styles/tablet/SelectBoxComponentStyle';
import {
  mdMobileIconSize,
  smMobileIconSize,
} from '../../styles/mobile/SelectBoxComponentStyle';
import { getDeviceStyle } from '../../utils/responsive_util';

class OptionsSelectBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelected: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return { isSelected: props.isSelected };
  }

  onPress = () => {
    if (this.props.fieldName != 'isYouth')
      this.props.onChangeValue(this.props.fieldName, !this.state.isSelected);
  }

  render() {
    const iconsize = this.props.renderSmallSize ? getDeviceStyle(smTabletIconSize, smMobileIconSize) : getDeviceStyle(mdTabletIconSize, mdMobileIconSize);

    return (
      <View>
        <SelectBox
          onPress={() => this.onPress()}
          value={this.state.isSelected}
          label={ this.props.title }
          isSelected={this.state.isSelected}
          renderSmallSize={this.props.renderSmallSize}
        >
          <FontAwesomeIcon name={this.props.iconName} size={iconsize} style={{paddingHorizontal: 10}}
            color={participantHelper.getItemColor(this.state.isSelected, 'text')}
          />
        </SelectBox>
      </View>
    );
  }
}

export default OptionsSelectBox;