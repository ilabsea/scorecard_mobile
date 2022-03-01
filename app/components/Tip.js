import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

import { LocalizationContext } from '../components/Translations';
import { Icon } from 'native-base';
import Color from '../themes/color';
import customStyle from '../themes/customStyle';
import cardListItemStyle from '../themes/cardListItemStyle';
import { TouchableRipple } from 'react-native-paper';

import { cardBorderRadius } from '../constants/border_radius_constant';
import { getDeviceStyle } from '../utils/responsive_util';
import TipTabletStyles from '../styles/tablet/TipComponentStyle';
import TipMobileStyles from '../styles/mobile/TipComponentStyle';

const responsiveStyles = getDeviceStyle(TipTabletStyles, TipMobileStyles);

export default class Tip extends Component {
  static contextType = LocalizationContext;

  renderTipIcon(scorecard) {
    let iconSize = 40;

    return (
      <View style={[cardListItemStyle.statusIconWrapper, responsiveStyles.tipIconContainer]}>
        <Image source={require('../assets/images/tip.png')} style={responsiveStyles.tipIcon}/>
      </View>
    )
  }

  render() {
    let scorecard = this.props.scorecard || {};
    const { translations } = this.context;

    return (
      <View>
        <TouchableRipple
          onPress={() => this.props.showTipModal()}
          style={[customStyle.card, {marginBottom: 16, borderRadius: cardBorderRadius}]}>

          <View style={{flexDirection: 'row'}}>
            { this.renderTipIcon(scorecard) }

            <View style={styles.contentWrapper}>
              <Text style={[cardListItemStyle.h2, responsiveStyles.title]}>{ translations.tips }</Text>
              <Text style={[{color: Color.headerColor}, responsiveStyles.viewDetailLabel]}>{translations.viewTips}</Text>
              <Icon name='chevron-forward-outline' style={[{color: Color.headerColor}, responsiveStyles.viewDetailIcon]} />
            </View>
          </View>
        </TouchableRipple>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    padding: 16,
    paddingRight: 10
  }
});