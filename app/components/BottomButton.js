import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Icon, Text, View} from 'native-base';
import CustomStyle from '../themes/customStyle';

class BottomButton extends Component {
  render() {
    let iconName = this.props.iconName || 'arrow-forward'
    return (
      <Button iconRight full primary onPress={() => this.props.onPress()} style={CustomStyle.bottomButton} {...this.props}>
        <View style={{width: 60}} />
        <Text style={styles.labelStyle}>{this.props.label}</Text>
        <Icon name={iconName} style={{marginRight: 20, color: '#fff'}} />
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
    color: '#fff'
  },
});

export default BottomButton;
