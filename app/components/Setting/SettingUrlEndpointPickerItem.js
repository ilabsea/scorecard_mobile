import React from 'react';
import { View, Text } from 'react-native';

import EndpointBadge from '../Share/EndpointBadge';

import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import BottomSheetPickerTabletStyles from '../../styles/tablet/BottomSheetPickerComponentStyle';
import BottomSheetPickerMobileStyles from '../../styles/mobile/BottomSheetPickerComponentStyle';

const styles = getDeviceStyle(BottomSheetPickerTabletStyles, BottomSheetPickerMobileStyles);

class SettingUrlEndpointPickerItem extends React.Component {
  render() {
    const {item} = this.props;

    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', marginBottom: 8, alignItems: 'center'}}>
          <Text style={[styles.itemTitle, { color: Color.blackColor }]}>{ item.label }</Text>

          <EndpointBadge endpoint={item} />
        </View>
        <Text style={[styles.itemSubtitle, { color: Color.grayColor }]}>{ item.value }</Text>
      </View>
    )
  }
}

export default SettingUrlEndpointPickerItem;