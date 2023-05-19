import React, { useContext } from 'react';
import {View} from 'react-native';

import {LocalizationContext} from '../Translations';
import SaveButton from '../SaveButton';

import styles from '../../themes/participantListItemStyle';
import { containerPadding, isShortScreenDevice } from '../../utils/responsive_util';

const FormBottomSheetButton = (props) => {
  const { translations } = useContext(LocalizationContext);

  return (
    <View style={[styles.btnWrapper, { marginHorizontal: containerPadding, marginBottom: 14}, props.wrapperStyle]}>
      <SaveButton
        disabled={!props.isValid}
        onPress={() => props.save()}
        label={props.label || translations.save}
        customStyle={{ flex: 1, marginLeft: 0, height: isShortScreenDevice() ? 48 : 50 }}
      />
    </View>
  )
}

export default FormBottomSheetButton;