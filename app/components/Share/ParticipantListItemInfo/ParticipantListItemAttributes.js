import React from 'react';
import {View, Text} from 'react-native';

import {LocalizationContext} from '../../Translations';
import ListItemGenderIcon from '../ListItemGenderIcon';

import Color from '../../../themes/color';
import { smallTextFontSize, mediumIconSize } from '../../../utils/font_size_util';
import { getDeviceStyle } from '../../../utils/responsive_util';
import ParticipantListItemTabletStyles from '../../../styles/tablet/ParticipantListItemComponentStyle';
import ParticipantListItemMobileStyles from '../../../styles/mobile/ParticipantListItemComponentStyle';

const styles = getDeviceStyle(ParticipantListItemTabletStyles, ParticipantListItemMobileStyles);

class ParticipantAttributes extends React.Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.fontSize = props.fontSize || smallTextFontSize();
    this.labelColor = props.labelColor || Color.blackColor;
  }

  getAge = () => {
    return !this.props.participant ? '' : this.props.participant.age;
  }

  renderBooleanData(data, fieldName) {
    if (fieldName == 'countable')
      return !data ? this.context.translations.anonymous : '';

    return !!data ? `${this.context.translations[fieldName]}  ` : '';
  }

  renderAttributes() {
    const attributes = ['disability', 'minority', 'poor', 'youth', 'countable'];
    let info = '';
    attributes.map(attribute => {
      info += this.renderBooleanData(this.props.participant[attribute], attribute);
    });

    return <Text style={[styles.attributeLabel, { fontSize: this.fontSize, flex: 1, paddingRight: 12, color: this.labelColor }]} numberOfLines={1}>{ info }</Text>;
  }

  render() {
    const { translations, appLanguage } = this.context

    return (
      <View style={{flexDirection: 'row', paddingHorizontal: 12, alignItems: 'center'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: this.fontSize, color: this.labelColor}}>{ this.getAge() }</Text>
          <Text style={{fontSize: this.fintSize, color: this.labelColor}}> { translations.year }{ appLanguage == 'en' && 's' }</Text>
        </View>

        <ListItemGenderIcon gender={this.props.participant.gender} color={this.labelColor} customGenderStyle={this.props.customGenderStyle} />
        {this.renderAttributes()}
      </View>
    )
  }
}

export default ParticipantAttributes;