import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import OutlinedButton from '../OutlinedButton';

import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';
import FormModalTabletStyles from '../../styles/tablet/FormModalComponentStyle';
import FormModalMobileStyles from '../../styles/mobile/FormModalComponentStyle';

const styles = getDeviceStyle(FormModalTabletStyles, FormModalMobileStyles);

const ScorecardResullModalSubTitle = (props) => {
  const { translations } = useContext(LocalizationContext);

  return (
    <View style={{flexDirection: 'row', padding: containerPadding}}>
      <Text style={styles.subTitleText}>{ props.subTitle }</Text>

      { !props.isScorecardFinished &&
        <OutlinedButton
          icon='plus'
          label={ translations.addNew }
          onPress={() => props.addNewPoint() }
          disabled={props.isScorecardFinished}
        />
      }
    </View>
  )
}

export default ScorecardResullModalSubTitle;