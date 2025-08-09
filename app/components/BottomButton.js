import React, {Component} from 'react';
import { Text } from 'react-native-paper';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomStyle from '../themes/customStyle';
import Color from '../themes/color';

import { getDeviceStyle } from '../utils/responsive_util';
import BottomButtonTabletStyles from '../styles/tablet/BottomButtonComponentStyle';
import BottomButtonMobileStyles from '../styles/mobile/BottomButtonComponentStyle';

const styles = getDeviceStyle(BottomButtonTabletStyles, BottomButtonMobileStyles);

class BottomButton extends Component {
  render() {
    let iconName = this.props.iconName || 'arrow-forward-outline'

    return (
      <TouchableOpacity onPress={() => this.props.onPress()}
        style={[CustomStyle.bottomButton, styles.buttonContainer, { backgroundColor: this.props.disabled ? Color.disabledBtnBg : Color.primaryButtonColor }]}
        disabled={this.props.disabled || false}
      >
        <View style={{width: 40}} />
        <Text style={styles.buttonLabel}>{this.props.label}</Text>
        <View style={{width: 40, alignItems: 'flex-end'}}>
          { iconName != 'none' &&
            <Icon name={iconName} style={styles.buttonIcon} />
          }
        </View>
      </TouchableOpacity>
    )
  }
}

export default BottomButton;
