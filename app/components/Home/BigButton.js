import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Icon } from 'native-base';
import PropTypes from 'prop-types';

import { getDeviceStyle } from '../../utils/responsive_util';
import BigButtonTabletStyles from './styles/tablet/BigButtonStyle';
import BigButtonMobileStyles from './styles/mobile/BigButtonStyle';

const responsiveStyles = getDeviceStyle(BigButtonTabletStyles, BigButtonMobileStyles);

const BigButton = (props) => {
  return (
    <TouchableOpacity
      onPress={ props.onPress }
      style={[styles.button, responsiveStyles.button]}>

      <Icon name={props.icon} style={[styles.icon, responsiveStyles.icon]}/>
      <Text style={[{ color: '#fff' }, responsiveStyles.label]}>{ props.label }</Text>
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
    backgroundColor: '#003b5c',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20
  },
  icon: {
    color: '#fff',
  },
});


export default BigButton;
