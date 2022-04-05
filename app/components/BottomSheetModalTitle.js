import React from 'react';
import { Text, View } from 'react-native';
import DashedLine from './DashedLine';

import styles from '../themes/modalStyle';
import { getDeviceStyle, containerPadding } from '../utils/responsive_util';
import PopupModalTabletStyles from '../styles/tablet/PopupModalComponentStyle';
import PopupModalMobileStyles from '../styles/mobile/PopupModalComponentStyle';
const responsiveStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

const BottomSheetModalTitle = (props) => {
  return (
    <View>
      <Text style={[styles.title, responsiveStyles.headerTitle, { padding: containerPadding }]} numberOfLines={1}>
        { props.title }
      </Text>
      <DashedLine containerStyle={props.dashedLineStyle} />
    </View>
  )
}

export default BottomSheetModalTitle;
