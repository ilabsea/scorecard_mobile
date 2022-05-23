import React, { useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { LocalizationContext } from '../Translations';
import Color from '../../themes/color';
import { bodyFontSize } from '../../utils/font_size_util';

const SwipeableDeleteButton = (props) => {
  const { translations } = useContext(LocalizationContext);

  return (
    <RectButton onPress={() => props.onPress()} style={[ styles.container, props.containerStyle ]}>
      <Text style={[{color: Color.whiteColor, }]}>{ translations.delete }</Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.redColor,
    maxHeight: 157,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: Color.whiteColor,
    fontSize: bodyFontSize(),
  }
});

export default SwipeableDeleteButton;