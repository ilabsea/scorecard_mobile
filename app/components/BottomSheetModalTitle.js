import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import DashedLine from './DashedLine';

import {LocalizationContext} from './Translations';
import OutlinedButton from './OutlinedButton';
import styles from '../themes/modalStyle';
import { smallTitleFontSize, titleFontSize } from '../utils/font_size_util';
import { getDeviceStyle, containerPadding } from '../utils/responsive_util';
import PopupModalTabletStyles from '../styles/tablet/PopupModalComponentStyle';
import PopupModalMobileStyles from '../styles/mobile/PopupModalComponentStyle';
import Color from '../themes/color';
const responsiveStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

const BottomSheetModalTitle = (props) => {
  const { translations } = useContext(LocalizationContext);
  const [ isMultiLine, setIsMultiLine ] = useState(false);

  function renderRightButton() {
    return <View style={{paddingBottom: containerPadding, paddingTop: containerPadding - getDeviceStyle(6, 10)}}>
            <OutlinedButton
              icon="plus"
              label={translations.addNew}
              onPress={() => !!props.onPressRightButton && props.onPressRightButton() }
            />
          </View>
  }

  function headerFontSize() {
    return { fontSize: isMultiLine ? smallTitleFontSize() : titleFontSize() };
  }

  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: containerPadding}}>
        <Text style={[styles.title, responsiveStyles.headerTitle, headerFontSize(), { paddingVertical: containerPadding, flex: 1}]} numberOfLines={2}
          onTextLayout={(e) => { if (!isMultiLine) setIsMultiLine(e.nativeEvent.lines.length > 1) }}
        >
          { props.title }
          { props.isRequire && <Text style={[{color: Color.redColor}, responsiveStyles.headerTitle, headerFontSize()]}> *</Text> }
        </Text>

        { !!props.hasAddButton && renderRightButton() }
      </View>
      <DashedLine containerStyle={props.dashedLineStyle} />
    </View>
  )
}

export default BottomSheetModalTitle;