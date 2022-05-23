import React from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import ActionButton from '../ActionButton';
import MessageLabel from '../MessageLabel';

import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';
import { bodyFontSize } from '../../utils/font_size_util';

class EndpointUrlListFooter extends React.Component {
  static contextType = LocalizationContext

  renderButton() {
    return <ActionButton
              label="រក្សាទុក និងផ្ទៀងផ្ទាត់"
              onPress={() => this.props.save()}
              isDisabled={this.props.isLoading || !this.props.isValid || this.props.isLocked}
              customButtonStyle={{marginTop: 2}}
            />
  }

  render() {
    return (
      <View style={{padding: containerPadding}}>
        { this.renderButton() }
      </View>
    )
  }
}

export default EndpointUrlListFooter;