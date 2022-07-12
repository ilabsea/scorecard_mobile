import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../../themes/color';

import { getDeviceStyle } from '../../utils/responsive_util';
import OutlineInfoIconTabletStyles from '../../styles/tablet/OutlineInfoIconComponentStyle';
import OutlineInfoIconMobileStyles from '../../styles/mobile/OutlineInfoIconComponentStyle';

const responsiveStyles = getDeviceStyle(OutlineInfoIconTabletStyles, OutlineInfoIconMobileStyles);

class OutlineInfoIcon extends Component {
  render() {
    const iconName = this.props.iconName || 'exclamation';

    return (
      <View style={[styles.iconContainer, this.props.customIconContainerStyles]}>
        <Icon name={ iconName } color={this.props.color} style={[responsiveStyles.icon, this.props.customIconStyle]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    borderWidth: 3,
    borderColor: Color.paleGrayColor,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 40,
    height: 48,
    width: 48,
    marginRight: 15,
  }
});

export default OutlineInfoIcon;