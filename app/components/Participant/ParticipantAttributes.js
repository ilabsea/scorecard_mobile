import React from 'react';
import {View, Text} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {LocalizationContext} from '../Translations';
import GenderIcon from '../Share/GenderIcon';

import Color from '../../themes/color';
import uuidv4 from '../../utils/uuidv4';
import { smallTextFontSize, mediumIconSize } from '../../utils/font_size_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import ParticipantListItemTabletStyles from '../../styles/tablet/ParticipantListItemComponentStyle';
import ParticipantListItemMobileStyles from '../../styles/mobile/ParticipantListItemComponentStyle';

const styles = getDeviceStyle(ParticipantListItemTabletStyles, ParticipantListItemMobileStyles);

class ParticipantAttributes extends React.Component {
  static contextType = LocalizationContext;

  renderGender = () => {
    if (this.props.participant.gender === '')
      return <MaterialIcon name="person" size={mediumIconSize()} color="#b9b9b9" style={{paddingHorizontal: 10}} />;

    return <GenderIcon gender={this.props.participant.gender}
              size={mediumIconSize()} color={Color.blackColor}
              containerStyle={{width: 50, marginRight: -5}}
            />
  };

  getAge = () => {
    return !this.props.participant ? '' : this.props.participant.age;
  }

  renderAttributes() {
    const { translations } = this.context;
    const attributes = ['disability', 'minority', 'poor'];

    return attributes.map(attribute => {
      if (!!this.props.participant[attribute]) {
        return (
          <Text key={uuidv4()} style={styles.attributeLabel}>
            { translations[attribute] }
          </Text>
        )
      }
    });
  }

  render() {
    const { translations, appLanguage } = this.context

    return (
      <View style={{flexDirection: 'row', borderWidth: 0, paddingHorizontal: 12, alignItems: 'center'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: smallTextFontSize()}}>{ this.getAge() }</Text>
          <Text style={{fontSize: smallTextFontSize()}}> { translations.year }{ appLanguage == 'en' ? 's' : '' }</Text>
        </View>

        { this.renderGender() }
        {this.renderAttributes()}
      </View>
    )
  }
}

export default ParticipantAttributes;