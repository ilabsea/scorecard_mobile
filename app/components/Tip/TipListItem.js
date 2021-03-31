import React, {Component} from 'react';

import {
  View,
  Text,
} from 'react-native';

import { LocalizationContext } from '../Translations';
import Color from '../../themes/color';
import { Avatar } from 'react-native-paper';
import uuidv4 from '../../utils/uuidv4';

import { getDeviceStyle } from '../../utils/responsive_util';
import TipListItemTabletStyle from './styles/tablet/TipListItemStyle';
import TipListItemMobileStyle from './styles/mobile/TipListItemStyle';
const styles = getDeviceStyle(TipListItemTabletStyle, TipListItemMobileStyle);

export default class TipListItem extends Component {
  static contextType = LocalizationContext;

  renderIcon(num) {
    return (
      <View style={{marginRight: 20}}>
        <Avatar.Text size={styles.avatarTextSize} label={num} style={{backgroundColor: Color.tipBgColor}} />
      </View>
    )
  }

  render() {
    const { translations } = this.context;
    const { title, subTitle, number, titleStyle } = this.props;

    return (
      <View key={ uuidv4() } style={{flexDirection: 'row', marginBottom: 20}}>
        { this.renderIcon(number) }

        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={[styles.titleText, titleStyle]}>{title}</Text>

          { !!subTitle && <Text style={styles.subTitleText}>{subTitle}</Text> }
        </View>
      </View>
    )
  }
}
