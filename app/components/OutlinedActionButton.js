import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import Color from '../themes/color';

class OutlinedActionButton extends Component {
  borderColor = () => {
    return !this.props.isDisabled ? {borderColor: Color.primaryButtonColor} : {};
  }

  labelColor = () => {
    return !this.props.isDisabled ? {color: Color.primaryButtonColor} : {};
  }

  render() {
    const {onPress, label, isDisabled, customButtonStyle} = this.props;
    return (
      <Button
        onPress={() => onPress()}
        mode="outlined"
        uppercase={true}
        contentStyle={[styles.contentStyle]}
        labelStyle={[styles.labelStyle, this.labelColor()]}
        style={[styles.buttonStyle, customButtonStyle, this.borderColor()]}
        disabled={isDisabled}>
        {label}
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  contentStyle: {
    height: 50,
    width: '100%',
  },
  buttonStyle: {
    width: '100%',
    borderRadius: 4,
    elevation: 0,
    borderWidth: 2
  },
  labelStyle: {
    fontSize: 18,
  },
});

export default OutlinedActionButton;
