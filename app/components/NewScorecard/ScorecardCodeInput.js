import React, { Component } from 'react';
import { View, Text } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Clipboard from '@react-native-clipboard/clipboard';

import { LocalizationContext } from '../Translations';

import { getDeviceStyle } from '../../utils/responsive_util';
import ScorecardCodeInputTabletStyles from '../../styles/tablet/ScorecardCodeInputComponentStyle';
import ScorecardCodeInputMobileStyles from '../../styles/mobile/ScorecardCodeInputComponentStyle';

const styles = getDeviceStyle(ScorecardCodeInputTabletStyles, ScorecardCodeInputMobileStyles);
class ScorecardCodeInput extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.inputRef = null;
  }

  componentDidMount() {
    setTimeout(() => {
      this.inputRef.focusField(0);
    }, 5);
  }

  onCodeFilled = (code) => {
    Clipboard.setString(null);
    this.props.joinScorecard(code);
  }

  render() {
    const {translations} = this.context;

    return (
      <View>
        <Text style={styles.label}>
          {translations.enterScorecardCode}
        </Text>

        <OTPInputView
          ref={(ref) => this.inputRef = ref}
          style={styles.container}
          pinCount={6}
          autoFocusOnLoad={true}
          codeInputFieldStyle={styles.inputContainer}
          onCodeFilled = {(code) => this.onCodeFilled(code)}
          keyboardType='number-pad'
          editable={true}
        />
      </View>
    )
  }
}

export default ScorecardCodeInput;