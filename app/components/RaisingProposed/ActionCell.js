import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import UserTableTabletStyles from '../../styles/tablet/UserTableComponentStyle';
import UserTableMobileStyles from '../../styles/mobile/UserTableComponentStyle';

const responsiveStyles = getDeviceStyle(UserTableTabletStyles, UserTableMobileStyles);

class ActionCell extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{flexDirection: 'row', alignSelf: 'center'}}
        onPress={() => this.props.onPress()}
      >
        <MaterialIcon name="edit" color={Color.primaryButtonColor} style={responsiveStyles.actionCellIcon} />
        <Text style={[styles.actionCellLabel, responsiveStyles.actionCellLabel]}>
          {this.props.actionLabel}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  actionCellLabel: {
    color: Color.primaryButtonColor,
    textTransform: 'uppercase',
    fontWeight: '700',
    marginLeft: 4,
  }
});

export default ActionCell;