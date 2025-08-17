import React, { Component } from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../themes/color';

import { getDeviceStyle } from '../utils/responsive_util';
import { pressableItemSize } from '../utils/component_util';
import { outlinedButtonIconSize } from '../utils/font_size_util';
import OutlinedButtonTabletStyles from '../styles/tablet/OutlinedButtonComponentStyle';
import OutlinedButtonMobileStyles from '../styles/mobile/OutlinedButtonComponentStyle';

const responsiveStyles = getDeviceStyle(OutlinedButtonTabletStyles, OutlinedButtonMobileStyles);

class OutlinedButton extends Component {
  renderlabelAndSubLabel = () => {
    return <View style={{flex: 1}}>
              <Text style={[{color: Color.headerColor, marginLeft: -this.props.iconFontSize}, responsiveStyles.buttonLabel, this.props.buttonColor, this.props.labelStyle]}>{this.props.label}</Text>
              <Text numberOfLines={1} style={[responsiveStyles.buttonSubLabel, {marginLeft: -this.props.iconFontSize}, this.props.subLabelStyle]}>{this.props.subLabel}</Text>
           </View>
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPress()}
        style={[
          styles.btn,
          this.props.buttonStyle
        ]}
      >
        { !this.props.hideIcon &&
          <Icon name={this.props.icon || 'add-outline'} type="FontAwesome"
            style={[responsiveStyles.buttonIcon, {color: Color.headerColor, fontSize: this.props.iconFontSize || outlinedButtonIconSize(), marginRight: 8}, this.props.buttonColor, this.props.iconStyle]}
          />
        }
        { !!this.props.subLabel ? this.renderlabelAndSubLabel()
          : <Text style={[{color: Color.headerColor}, responsiveStyles.buttonLabel, this.props.buttonColor, this.props.labelStyle]}>{this.props.label}</Text>
        }
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 16,
    height: pressableItemSize(),
    borderRadius: getDeviceStyle(6, 4),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primaryColor
  }
})

export default OutlinedButton;
