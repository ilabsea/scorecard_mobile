import React, { useContext } from 'react';
import {View} from 'react-native';

import {LocalizationContext} from '../Translations';
import SaveButton from '../SaveButton';

import Color from '../../themes/color';
import styles from '../../themes/participantListItemStyle';
import { containerPadding } from '../../utils/responsive_util';

const FormBottomSheetButton = (props) => {
  const { translations } = useContext(LocalizationContext);

  return (
    <View style={[styles.btnWrapper,
      { margin: containerPadding, paddingTop: containerPadding, borderTopWidth: 1, borderTopColor: Color.lightGrayColor }]}
    >
      <SaveButton
        disabled={!props.isValid}
        onPress={() => props.save()}
        label={translations.save}
      />
    </View>
  )
}

export default FormBottomSheetButton;