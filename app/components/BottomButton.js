import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Icon, Text, View} from 'native-base';

class BottomButton extends Component {
  render() {
    return (
      <Button iconRight full primary onPress={() => this.props.onPress()} style={{elevation: 0, height: 50}}>
        <View style={{width: 40}} />
        <Text style={styles.labelStyle}>{this.props.label}</Text>
        <Icon name="arrow-forward" />
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