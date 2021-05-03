import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Icon } from 'native-base';
import PropTypes from 'prop-types';

import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import BigButtonTabletStyles from '../../styles/tablet/BigButtonComponentStyle';
import BigButtonMobileStyles from '../../styles/mobile/BigButtonComponentStyle';

const responsiveStyles = getDeviceStyle(BigButtonTabletStyles, BigButtonMobileStyles);

const BigButton = (props) => {
  return (
    <TouchableOpacity
      onPress={ props.onPress }
      style={[styles.button, responsiveStyles.button]}>

      <Icon name={props.icon} style={[styles.icon, responsiveStyles.icon]}/>
      <Text style={[{ color: Color.whiteColor }, responsiveStyles.label]}>{ props.label }</Text>
    </TouchableOpacity>
  )
}

BigButton.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Color.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20
  },
  icon: {
    color: Color.whiteColor,
  },
});


export default BigButton;
