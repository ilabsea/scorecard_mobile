import React from 'react';
import { View, Text } from 'react-native';

import CustomStyle from '../../../themes/customStyle';
import Color from '../../../themes/color';

import OutlineInfoIcon from '../OutlineInfoIcon';

class CustomAlertMessageHeader extends React.Component {
  render() {
    return (
      <React.Fragment>
        <View style={{alignItems: 'center', marginBottom: 14}}>
          <OutlineInfoIcon
            iconName={this.props.iconName}
            color={Color.warningColor}
            customIconContainerStyles={{width: 58, height: 58}}
            customIconStyle={{fontSize: 38}}
          />
        </View>
        { !!this.props.title &&
          <View style={{alignItems: 'center'}}>
            <Text style={[CustomStyle.modalTitle, { marginBottom: 0 }, this.props.titleStyle]}>
              { this.props.title }
            </Text>
          </View>
        }
      </React.Fragment>
    )
  }
}

export default CustomAlertMessageHeader;