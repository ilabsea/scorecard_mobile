import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { Icon } from 'native-base';

import {LocalizationContext} from '../Translations';
import OutlineInfoIcon from '../OutlineInfoIcon';
import SettingScorecardMigrationInstructions from './SettingScorecardMigrationInstructions';

import Color from '../../themes/color';
import customStyle from '../../themes/customStyle';
import { cardBorderRadius } from '../../constants/border_radius_constant';
import { bodyFontSize } from '../../utils/font_size_util';
import { pressableItemSize } from '../../utils/component_util';
import { settingReLoginInfoModalSnapPoints } from '../../constants/modal_constant';

import { getDeviceStyle } from '../../utils/responsive_util';
import TipTabletStyles from '../../styles/tablet/TipComponentStyle';
import TipMobileStyles from '../../styles/mobile/TipComponentStyle';

const responsiveStyles = getDeviceStyle(TipTabletStyles, TipMobileStyles);

class SettingScorecardMigrationTip extends React.Component {
  static contextType = LocalizationContext;

  showInstruction() {
    this.props.formRef.current?.setSnapPoints(settingReLoginInfoModalSnapPoints);
    this.props.formRef.current?.setBodyContent(<SettingScorecardMigrationInstructions/>);
    this.props.formModalRef.current?.present();
  }

  renderLabel() {
    return <View style={styles.contentWrapper}>
            <Text numberOfLines={1} style={[responsiveStyles.title, { fontSize: bodyFontSize(), color: Color.clickableColor }]}>
              { this.context.translations.theAppRequiresReLogin }
            </Text>

            <Icon name='chevron-forward-outline' style={[{color: Color.clickableColor}, responsiveStyles.viewDetailIcon]} />
          </View>
  }

  render() {
    return (
      <TouchableRipple onPress={() => this.showInstruction()}
        style={[customStyle.card, styles.container]}
      >
        <View style={{flexDirection: 'row', alignItems: 'center', height: '100%'}}>
          <OutlineInfoIcon color={Color.clickableColor} customIconContainerStyles={{borderColor: Color.clickableColor}} />
          { this.renderLabel() }
        </View>
      </TouchableRipple>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: cardBorderRadius,
    height: pressableItemSize(16),
    paddingHorizontal: 10,
    backgroundColor: Color.paleGrayColor
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  }
});

export default SettingScorecardMigrationTip;