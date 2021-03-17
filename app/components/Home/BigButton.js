import React, { useContext } from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';

import { Icon } from 'native-base';
import PropTypes from 'prop-types';

import styles from './styles/BigButtonStyle.js';

const BigButton = (props) => {
  return (
    <TouchableOpacity
      onPress={ props.onPress }
      style={ styles.button }>

      <Icon name={props.icon} style={ styles.icon }/>
      <Text style={styles.label}>{ props.label }</Text>
    </TouchableOpacity>
  )
}

BigButton.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
  onPress: PropTypes.func
};

export default BigButton;