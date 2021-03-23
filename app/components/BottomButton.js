import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Icon, Text, View} from 'native-base';
import CustomStyle from '../themes/customStyle';

import { getDeviceStyle } from '../utils/responsive_util';
import BottomButtonTabletStyles from './styles/tablet/BottomButtonStyle';
import BottomButtonMobileStyles from './styles/mobile/BottomButtonStyle';

const styles = getDeviceStyle(BottomButtonTabletStyles, BottomButtonMobileStyles);

class BottomButton extends Component {
  render() {
    let iconName = this.props.iconName || 'arrow-forward'
    return (
      <Button iconRight full primary onPress={() => this.props.onPress()} style={CustomStyle.bottomButton} {...this.props}>
        <View style={{width: 40}} />
        <Text style={styles.buttonLabel}>{this.props.label}</Text>
        <View style={{width: 40, alignItems: 'flex-end'}}>
          <Icon name={iconName} style={styles.buttonIcon} />
        </View>
      </Button>
    );
  }
}

export default BottomButton;
