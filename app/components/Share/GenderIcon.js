import React from 'react';
import { View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import participantHelper from '../../helpers/participant_helper';

class GenderIcon extends React.Component {

  renderMaleFemaleIcon() {
    const iconName = participantHelper.getGenderIconLabel(this.props.gender);
    return <FontAwesomeIcon name={iconName} size={this.props.size} color={this.props.color} />
  }

  renderTransgenderIcon() {
    const subIconSize = this.props.transgenderIconSize >= 30 ? this.props.transgenderIconSize - 6 : this.props.transgenderIconSize - 10;
    const top = this.props.transgenderIconSize >= 30 ? -12 : -8;
    const paddingLeft = this.props.transgenderIconSize >= 30 ? '30%' : '25%';

    return (
      <View style={[{position: 'relative', alignItems: 'center'}, this.props.transgenderContainerStyle]}>
        <FontAwesomeIcon name='user-o' size={this.props.transgenderIconSize - 15} color={this.props.color} />

        <FontAwesomeIcon name='question' size={subIconSize} color={this.props.color}
          style={{ position: 'absolute', top: top, alignSelf: 'center', paddingLeft: paddingLeft}}
        />
      </View>
    )
  }

  render() {
    return <View style={[{ alignItems: 'center' }, this.props.containerStyle]}>
              { this.props.gender == 'other' ? this.renderTransgenderIcon() : this.renderMaleFemaleIcon() }
           </View>
  }
}

export default GenderIcon;