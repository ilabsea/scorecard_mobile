import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Icon } from 'native-base';
import PropTypes from 'prop-types';

const BigButton = (props) => {
  return (
    <TouchableOpacity
      onPress={ props.onPress }
      style={ styles.button }>

      <Icon name={props.icon} style={ styles.icon }/>
      <Text style={{color: '#fff', fontSize: 20}}>{ props.label }</Text>
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
    height: 86,
    width: '65%',
    maxWidth: 360,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20
  },
  icon: {
    color: '#fff',
    fontSize: 48,
    marginLeft: 24,
    marginRight: 40
  }
});


export default BigButton;
