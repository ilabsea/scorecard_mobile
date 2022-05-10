import React from 'react';
import {View, Text} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {LocalizationContext} from '../Translations';

import Color from '../../themes/color';
import participantHelper from '../../helpers/participant_helper';
import uuidv4 from '../../utils/uuidv4';
import { smallTextFontSize, mediumIconSize } from '../../utils/font_size_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import ParticipantListItemTabletStyles from '../../styles/tablet/ParticipantListItemComponentStyle';
import ParticipantListItemMobileStyles from '../../styles/mobile/ParticipantListItemComponentStyle';

const styles = getDeviceStyle(ParticipantListItemTabletStyles, ParticipantListItemMobileStyles);

class ParticipantListItemAgeAndGender extends React.Component {
  static contextType = LocalizationContext;

  renderGender = () => {
    if (this.props.participant.gender === '')
      return <MaterialIcon name="person" size={mediumIconSize()} color="#b9b9b9" style={{paddingHorizontal: 10}} />;

    const gender = participantHelper.getGenderIconLabel(this.props.participant.gender);
    return <FontAwesomeIcon name={gender} style={styles.iconStyle} color={Color.blackColor} />;
  };

  getAge = () => {
    if (this.props.participant === undefined || this.props.participant.age === '')
      return '---';

    return this.props.participant.age;
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

        <View style={styles.genderContainer}>{ this.renderGender() }</View>

        {this.renderAttributes()}
      </View>
    )
  }
}

export default ParticipantListItemAgeAndGender;