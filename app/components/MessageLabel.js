import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import Color from '../themes/color';
import { bodyFontSize } from '../utils/font_size_util';

class MessageLabel extends Component {
  constructor(props) {
    super(props);
  }

  labelColor = () => {
    if(this.props.type === 'error')
      return {color: Color.errorColor};

    return {color: Color.successColor}
  }

  render() {
    const {message, customStyle} = this.props;

    if (message != '') {
      return (
        <Text style={[styles.messageLabel, this.labelColor(), customStyle]}>
          {message}
        </Text>
      );
    }
    else
      return (<Text style={[styles.messageLabel, this.labelColor(), customStyle]}/>)
  }
}

const styles = StyleSheet.create({
  messageLabel: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: bodyFontSize()
  }
});

export default MessageLabel;