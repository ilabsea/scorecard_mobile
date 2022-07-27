import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Color from '../../themes/color';
import OutlineInfoIcon from '../Share/OutlineInfoIcon';
import DashedLine from '../DashedLine';

import { containerPadding } from '../../utils/responsive_util';
import { titleFontSize } from '../../utils/font_size_util';
import CustomStyle from '../../themes/customStyle';

const BottomSheetInfoTitle = (props) => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <OutlineInfoIcon color={Color.warningColor} customIconContainerStyles={{ marginTop: -10 }} />
        <Text numberOfLines={1} style={[CustomStyle.modalTitle, styles.title]}>
          { props.title }
        </Text>
      </View>
      <DashedLine />
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    paddingHorizontal: containerPadding,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: titleFontSize(),
    padding: containerPadding,
    flex: 1,
    paddingLeft: 0,
    paddingBottom: 5
  }
});

export default BottomSheetInfoTitle;