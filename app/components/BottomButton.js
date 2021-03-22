import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Icon, Text, View} from 'native-base';
import CustomStyle from '../themes/customStyle';

import { getDeviceStyle } from '../utils/responsive_util';
import BottomButtonTabletStyles from '../assets/stylesheets/components/tablet/BottomButtonStyle';
import BottomButtonMobileStyles from '../assets/stylesheets/components/mobile/BottomButtonStyle';

const styles = getDeviceStyle(BottomButtonTabletStyles, BottomButtonMobileStyles);
class BottomButton extends Component {
  render() {
    let iconName = this.props.iconName || 'arrow-forward'
    return (
      <Button iconRight full primary onPress={() => this.props.onPress()} style={CustomStyle.bottomButton} {...this.props}>
        <View style={{width: 40}} />
        <Text style={styles.labelStyle}>{this.props.label}</Text>
        <View style={{width: 40, alignItems: 'flex-end'}}>
          <Icon name={iconName} style={{color: '#fff'}} />
        </View>
      </Button>
    );
  }
}

export default BottomButton;
