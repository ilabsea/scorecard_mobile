import React from 'react';
import {View, Text} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {LocalizationContext} from '../Translations';
import OptionsSelectBox from './OptionsSelectBox';
import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import { participantFormTitleFontSize } from '../../utils/font_size_util';
import { FontFamily } from '../../assets/stylesheets/theme/font';

class AnonymousSelectBox extends React.Component {
  static contextType = LocalizationContext;

  renderInfoBadge() {
    return <View style={{marginLeft: 10, backgroundColor: Color.paleGrayColor, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6}}>
              <Text style={{fontSize: getDeviceStyle(12, 10.2), fontFamily: FontFamily.body, color: '#a0a0a0'}}>{this.context.translations.forTheFirstParticipantOnly}</Text>
           </View>
  }

  render() {
    return (
      <View>
        <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          <Text style={{fontSize: participantFormTitleFontSize(), fontFamily: FontFamily.body}}>
            { this.context.translations.other } ({ this.context.translations.anonymous })
          </Text>
          {this.renderInfoBadge()}
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