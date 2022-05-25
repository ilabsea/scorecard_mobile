import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
// import { CUSTOM } from '../../constants/main_constant';
import BottomSheetPickerTabletStyles from '../../styles/tablet/BottomSheetPickerComponentStyle';
import BottomSheetPickerMobileStyles from '../../styles/mobile/BottomSheetPickerComponentStyle';

const styles = getDeviceStyle(BottomSheetPickerTabletStyles, BottomSheetPickerMobileStyles);

class SettingUrlEndpointPickerItem extends React.Component {
  render() {
    const {item} = this.props;

    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.itemTitle, { color: Color.blackColor }]}>{ item.label }</Text>
        </View>
        <Text style={[styles.itemSubtitle, { color: Color.grayColor }]}>{ item.value }</Text>
      </View>
    )
  }
}

export default SettingUrlEndpointPickerItem;