import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Icon, Text, View} from 'native-base';
import CustomStyle from '../themes/customStyle';

class BottomButton extends Component {
  render() {
    return (
      <Button  iconRight full primary onPress={() => this.props.onPress()} style={CustomStyle.bottomButton} {...this.props}>
        <View style={{width: 60}} />
        <Text style={styles.labelStyle}>{this.props.label}</Text>
        <Icon name="arrow-forward" style={{marginRight: 20}} />
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
  },
});

export default BottomButton;
