import React, { useContext } from 'react';
import {View} from 'react-native';

import {LocalizationContext} from '../Translations';
import SaveButton from '../SaveButton';

import styles from '../../themes/participantListItemStyle';
import { containerPadding } from '../../utils/responsive_util';

const FormBottomSheetButton = (props) => {
  const { translations } = useContext(LocalizationContext);

  return (
    <View style={[styles.btnWrapper,
      { margin: containerPadding, paddingTop: containerPadding }]}
    >
      <SaveButton
        disabled={!props.isValid}
        onPress={() => props.save()}
        label={translations.save}
        customStyle={{ flex: 1, marginLeft: 0 }}
      />
    </View>
  )
}

export default FormBottomSheetButton;