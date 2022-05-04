import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import DashedLine from './DashedLine';

import {LocalizationContext} from './Translations';
import OutlinedButton from './OutlinedButton';
import styles from '../themes/modalStyle';
import { getDeviceStyle, containerPadding } from '../utils/responsive_util';
import PopupModalTabletStyles from '../styles/tablet/PopupModalComponentStyle';
import PopupModalMobileStyles from '../styles/mobile/PopupModalComponentStyle';
import Color from '../themes/color';
const responsiveStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

const BottomSheetModalTitle = (props) => {
  const { translations } = useContext(LocalizationContext);

  function renderRightButton() {
    return <OutlinedButton
            icon="plus"
            label={translations.addNew}
            onPress={() => !!props.onPressRightButton && props.onPressRightButton() }
          />
  }

  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: containerPadding}}>
        <Text style={[styles.title, responsiveStyles.headerTitle]} numberOfLines={1}>
          { props.title }
          { props.isRequire && <Text style={[{color: Color.redColor}, responsiveStyles.headerTitle]}> *</Text> }
        </Text>

        { !!props.hasAddButton && renderRightButton() }
      </View>
      <DashedLine containerStyle={props.dashedLineStyle} />
    </View>
  )
}

export default BottomSheetModalTitle;