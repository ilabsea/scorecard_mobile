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
      <View style={[styles.container, props.customContainerStyle]}>
        <View>
          <OutlineInfoIcon color={Color.warningColor} customIconContainerStyles={{ marginTop: -10 }} />
        </View>
        <View style={[styles.titleContainer, props.customTitleContainerStyle]}>
          <Text numberOfLines={1} style={[CustomStyle.modalTitle, styles.title]}>
            { props.title }
          </Text>
          { props.children }
        </View>
      </View>
      <DashedLine />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: containerPadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: containerPadding
  },
  title: {
    fontSize: titleFontSize(),
    marginBottom: 8,
  }
});

export default BottomSheetInfoTitle;