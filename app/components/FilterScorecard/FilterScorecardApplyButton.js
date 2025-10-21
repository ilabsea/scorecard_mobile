import React, { useContext } from 'react';
import { View } from 'react-native';

import { LocalizationContext } from '../Translations';
import BottomButton from '../BottomButton';
import Color from '../../themes/color';
import { bottomButtonContainerPadding } from '../../utils/responsive_util';

const FilterScorecardApplyButton = (props) => {
  const {translations} = useContext(LocalizationContext);

  return (
    <View style={[bottomButtonContainerPadding(), {backgroundColor: Color.whiteColor, paddingBottom: 16}]}>
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