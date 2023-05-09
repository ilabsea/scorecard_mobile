import React, {Component} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import DeviceInfo from 'react-native-device-info'

import { LocalizationContext } from '../Translations';
import PressableLabel from './PressableLabel';
import { Icon } from 'native-base';
import Color from '../../themes/color';
import customStyle from '../../themes/customStyle';
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
    return (
      <View style={[cardListItemStyle.statusIconWrapper, responsiveStyles.tipIconContainer]}>
        <Image source={require('../../assets/images/tip.png')} style={responsiveStyles.tipIcon}/>
      </View>
    )
  }

  render() {
    let scorecard = this.props.scorecard || {};
    const { translations } = this.context;

    return (
      <View style={this.props.containerStyle}>
        <TouchableRipple
          onPress={() => this.props.showTipModal()}
          style={[customStyle.card, {marginBottom: 16, borderRadius: cardBorderRadius}]}>

          <View style={{flexDirection: 'row'}}>
            { this.renderTipIcon() }

            <View style={styles.contentWrapper}>
              <Text numberOfLines={1} style={[cardListItemStyle.h2, responsiveStyles.title]}>
                { translations.tips } - { translations[getTipByScreenName(this.props.screenName).mainTitle] }
              </Text>

              { DeviceInfo.isTablet() &&
                <PressableLabel label={translations.view} />
              }
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