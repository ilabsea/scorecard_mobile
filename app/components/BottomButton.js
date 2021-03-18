import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Icon, Text, View} from 'native-base';
import CustomStyle from '../themes/customStyle';
import { getResponsiveSize, getBottomButtonFontSize } from '../utils/responsive_util';

class BottomButton extends Component {
  render() {
    let iconName = this.props.iconName || 'arrow-forward'
    return (
      <Button iconRight full primary onPress={() => this.props.onPress()} style={CustomStyle.bottomButton} {...this.props}>
        <View style={{width: 30}} />
        <Text style={styles.labelStyle}>{this.props.label}</Text>
        <View style={{width: 30, alignItems: 'flex-end'}}>
          <Icon name={iconName} style={{marginRight: 0, color: '#fff', fontSize: getResponsiveSize(28, 24)}} />
        </View>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: getBottomButtonFontSize(),
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
  },
});

export default BottomButton;
