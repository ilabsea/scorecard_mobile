import React, { useContext } from 'react';
import { View } from 'react-native';

import { LocalizationContext } from '../Translations';
import BottomButton from '../BottomButton';
import Color from '../../themes/color';
import { containerPadding } from '../../utils/responsive_util';

const FilterScorecardApplyButton = (props) => {
  const {translations} = useContext(LocalizationContext);

  return (
    <View style={{padding: containerPadding}}>
      <BottomButton
        customBackgroundColor={Color.headerColor}
        iconName='none'
        label={translations.apply}
        onPress={() => props.applyFilter()}
      />
    </View>
  )
}

export default FilterScorecardApplyButton;