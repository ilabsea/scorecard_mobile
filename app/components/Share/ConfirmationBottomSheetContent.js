import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {LocalizationContext} from '../Translations';
import OutlineInfoIcon from './OutlineInfoIcon';
import BottomButton from '../BottomButton';
import Color from '../../themes/color';
import { FontSize, FontFamily } from '../../assets/stylesheets/theme/font';

const ConfirmationBottomSheetContent = (props) => {
  const insets = useSafeAreaInsets();
  const { translations } = useContext(LocalizationContext);

  return (
    <View style={{ flexGrow: 1, paddingTop: 10, paddingHorizontal: 16, alignItems: 'center', paddingBottom: insets.bottom + 12 }}>
      <OutlineInfoIcon
        color={Color.warningColor}
        customIconContainerStyles={{width: 88, height: 88, borderRadius: 88, marginRight: 0, marginBottom: 20}}
        customIconStyle={{fontSize: 68}}
      />

      <Text style={{fontSize: 22, fontFamily: FontFamily.title}}>
        { props.title }
      </Text>

      <Text style={{fontSize: FontSize.body, fontFamily: FontFamily.body, marginTop: 18}}>
        { props.confirmationMessage }
      </Text>
      <Text style={{fontSize: FontSize.body, fontFamily: FontFamily.body, marginTop: 16, marginBottom: 30}}>
        { props.notice }
      </Text>

      <View style={{width: '100%'}}>
        <BottomButton
          onPress={ props.onPress }
          customBackgroundColor={Color.headerColor}
          label={translations.ok}
          iconName="none"
          disabled={false}
        />
      </View>
    </View>
  );
}

export default ConfirmationBottomSheetContent;