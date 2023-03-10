import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons'

import { LocalizationContext } from '../Translations';
import { Icon } from 'native-base';
import Color from '../../themes/color';
import cardListItemStyle from '../../themes/cardListItemStyle';
import { TouchableRipple } from 'react-native-paper';

import { getTipByScreenName } from '../../helpers/tip_helper';
import { cardBorderRadius } from '../../constants/border_radius_constant';
import { getDeviceStyle } from '../../utils/responsive_util';
import TipTabletStyles from '../../styles/tablet/TipComponentStyle';
import TipMobileStyles from '../../styles/mobile/TipComponentStyle';

const responsiveStyles = getDeviceStyle(TipTabletStyles, TipMobileStyles);

export default class Tip extends Component {
  static contextType = LocalizationContext;
  renderTipIcon() {
    return <View style={[{alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12}]}>
              <IonIcon name="bulb-outline" size={getDeviceStyle(45, 35)} color={Color.tipBgColor} />
           </View>
  }

  render() {
    const { translations } = this.context;
    return (
      <TouchableRipple onPress={() => this.props.showTipModal()}
        style={{marginBottom: 16, borderRadius: cardBorderRadius, elevation: 0, borderWidth: 2, borderColor: Color.tipBgColor, backgroundColor: Color.whiteColor}}
      >
        <View style={{flexDirection: 'row'}}>
          { this.renderTipIcon() }
          <View style={styles.contentWrapper}>
            <Text numberOfLines={1} style={[cardListItemStyle.h2, responsiveStyles.title, {color: Color.tipBgColor}]}>
              { translations.tips } - { translations[getTipByScreenName(this.props.screenName).mainTitle] }
            </Text>
            <Icon name='chevron-forward-outline' style={[{color: Color.tipBgColor}, responsiveStyles.viewDetailIcon]} />
          </View>
        </View>
      </TouchableRipple>
    )
  }
}

const styles = StyleSheet.create({
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    padding: 16,
    paddingRight: 10,
    paddingLeft: 6
  }
});