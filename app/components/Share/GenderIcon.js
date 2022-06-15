import React from 'react';
import { View, Image } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/AntDesign';

import participantHelper from '../../helpers/participant_helper';

class GenderIcon extends React.Component {

  renderMaleFemaleIcon() {
    const iconName = participantHelper.getGenderIconLabel(this.props.gender);
    return <FontAwesomeIcon name={iconName} size={this.props.size} color={this.props.color} />
  }

  renderTransgenderIcon() {
    const imageSources = {
      'gray': require('../../assets/images/trans-gender-gray.png'),
      '#e4761e': require('../../assets/images/trans-gender-orange.png'),
      'default': require('../../assets/images/trans-gender-black.png')
    }

    return <Image
              source={imageSources[this.props.color] || imageSources.default}
              resizeMode="contain"
              style={this.props.transgenderIconStyle}
            />
  }

  render() {
    return <View style={[{ alignItems: 'center' }, this.props.containerStyle]}>
              { this.props.gender == 'other' ? this.renderTransgenderIcon() : this.renderMaleFemaleIcon() }
           </View>
  }
}

export default GenderIcon;