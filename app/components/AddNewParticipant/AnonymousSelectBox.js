import React from 'react';
import {View, Text} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {LocalizationContext} from '../Translations';
import OptionsSelectBox from './OptionsSelectBox';
import OutlineInfoIcon from '../Share/OutlineInfoIcon';
import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import { participantFormTitleFontSize } from '../../utils/font_size_util';

class AnonymousSelectBox extends React.Component {
  static contextType = LocalizationContext;

  render() {
    return (
      <View>
        <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          <Text style={{fontSize: participantFormTitleFontSize()}}>
            { this.context.translations.other } ({ this.context.translations.anonymous })  -
          </Text>
          <OutlineInfoIcon color={Color.warningColor} customIconStyle={{fontSize: 20}} customIconContainerStyles={{width: 23, height: 23, marginLeft: 8, borderWidth: 2, marginRight: 6}} />
          <Text style={{fontSize: participantFormTitleFontSize()}}>
            {this.context.translations.showForTheFirstParticipantOnly}
          </Text>
        </View>

        <View style={{ marginTop: 8, paddingLeft: wp(getDeviceStyle('8.3%', '4.5%')) }}>
          <OptionsSelectBox
            title={ this.context.translations.anonymous }
            iconName='eye-off'
            iconType='material'
            fieldName='anonymous'
            onChangeValue={this.props.onChange}
            isSelected={this.props.value}
            renderSmallSize={this.props.renderSmallSize}
          />
        </View>
      </View>
    )
  }
}

export default AnonymousSelectBox;