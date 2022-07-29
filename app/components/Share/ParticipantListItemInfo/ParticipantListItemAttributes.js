import React from 'react';
import {View, Text} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

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

  renderGender = () => {
    if (this.props.participant.gender === '')
      return <MaterialIcon name="person" size={mediumIconSize()} color={this.labelColor ||"#b9b9b9"} style={{paddingHorizontal: 10}} />;

    return <ListItemGenderIcon gender={this.props.participant.gender} color={this.labelColor} customGenderStyle={this.props.customGenderStyle} />
  };

  getAge = () => {
    return !this.props.participant ? '' : this.props.participant.age;
  }

  renderBooleanData(data, fieldName) {
    return !!data ? `${this.context.translations[fieldName]}  ` : '';
  }

  renderAttributes() {
    const attributes = ['disability', 'minority', 'poor', 'youth'];
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

        { this.renderGender() }
        {this.renderAttributes()}
      </View>
    )
  }
}

export default ParticipantAttributes;