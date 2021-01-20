import React, {Component} from 'react';

import {
  View,
  Text,
} from 'react-native';

import { LocalizationContext } from '../Translations';
import Color from '../../themes/color';
import { Avatar } from 'react-native-paper';
import uuidv4 from '../../utils/uuidv4';

export default class TipListItem extends Component {
  static contextType = LocalizationContext;

  renderIcon(num) {
    return (
      <View style={{marginRight: 20}}>
        <Avatar.Text size={60} label={num} style={{backgroundColor: Color.tipBgColor}} />
      </View>
    )
  }

  render() {
    const { translations } = this.context;
    const { title, subTitle, number } = this.props;

    return (
      <View key={ uuidv4() } style={{flexDirection: 'row', marginBottom: 20}}>
        { this.renderIcon(number) }

        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{flexShrink: 1}}>{title}</Text>

          { !!subTitle && <Text style={{color: '#858796', flexShrink: 1}}>{subTitle}</Text> }
        </View>
      </View>
    )
  }
}
