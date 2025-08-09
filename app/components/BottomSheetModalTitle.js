import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import DashedLine from './DashedLine';

import {LocalizationContext} from './Translations';
import OutlinedButton from './OutlinedButton';
import styles from '../themes/modalStyle';
import { smallTitleFontSize, titleFontSize, smallTextFontSize } from '../utils/font_size_util';
import { getDeviceStyle, containerPadding } from '../utils/responsive_util';
import PopupModalTabletStyles from '../styles/tablet/PopupModalComponentStyle';
import PopupModalMobileStyles from '../styles/mobile/PopupModalComponentStyle';
import Color from '../themes/color';
const responsiveStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

const BottomSheetModalTitle = (props) => {
  const { translations } = useContext(LocalizationContext);
  const [ isMultiLine, setIsMultiLine ] = useState(false);

  function renderRightButton() {
    return <OutlinedButton
              icon="add-circle-outline"
              label={translations.addNew}
              onPress={() => !!props.onPressRightButton && props.onPressRightButton() }
           />
  }

  function headerFontSize() {
    return { fontSize: isMultiLine ? smallTitleFontSize() : titleFontSize() };
  }

  return (
    <React.Fragment>
      <View style={{marginVertical: containerPadding}}>
        <View style={[{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: containerPadding}, !!props.hasAddButton && {alignItems: 'center'}]}>
          <Text style={[styles.title, responsiveStyles.headerTitle, headerFontSize(), {flex: 1}]} numberOfLines={2}
            onTextLayout={(e) => { if (!isMultiLine) setIsMultiLine(e.nativeEvent.lines.length > 1) }}
          >
            { props.title }
            { props.isRequire && <Text style={[{color: Color.redColor}, responsiveStyles.headerTitle, headerFontSize()]}> *</Text> }
          </Text>
          { !!props.hasAddButton && renderRightButton() }
        </View>
        { props.subtitle &&
          <Text style={{marginLeft: containerPadding, fontSize: smallTextFontSize(), color: Color.grayColor}}>
            {props.subtitle}
          </Text>
        }
      </View>
      <DashedLine containerStyle={props.dashedLineStyle} />
    </React.Fragment>
  )
}

export default BottomSheetModalTitle;