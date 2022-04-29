import React from 'react';
import { Text, View } from 'react-native';
import DashedLine from './DashedLine';

import styles from '../themes/modalStyle';
import { getDeviceStyle, containerPadding } from '../utils/responsive_util';
import PopupModalTabletStyles from '../styles/tablet/PopupModalComponentStyle';
import PopupModalMobileStyles from '../styles/mobile/PopupModalComponentStyle';
import Color from '../themes/color';
const responsiveStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

const BottomSheetModalTitle = (props) => {
  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: containerPadding}}>
        <Text style={[styles.title, responsiveStyles.headerTitle]} numberOfLines={1}>
          { props.title }
          { props.isRequire && <Text style={[{color: Color.redColor}, responsiveStyles.headerTitle]}> *</Text> }
        </Text>

        { (!!props.hasAddButton && !!props.rightButton) &&
          <View style={props.rightContainerStyle}>{ props.rightButton }</View>
        }
      </View>
      <DashedLine containerStyle={props.dashedLineStyle} />
    </View>
  )
}

export default BottomSheetModalTitle;
