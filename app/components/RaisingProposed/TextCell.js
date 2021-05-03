import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { getDeviceStyle } from '../../utils/responsive_util';
import UserTableTabletStyles from '../../styles/tablet/UserTableComponentStyle';
import UserTableMobileStyles from '../../styles/mobile/UserTableComponentStyle';

const responsiveStyles = getDeviceStyle(UserTableTabletStyles, UserTableMobileStyles);

class TextCell extends Component {
  render() {
    return (
      <View style={responsiveStyles.cellContainer}>
        <Text style={responsiveStyles.cellLabel}>{this.props.cellValue}</Text>
      </View>
    );
  }
}

export default TextCell;