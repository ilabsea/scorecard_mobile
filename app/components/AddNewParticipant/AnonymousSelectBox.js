import React from 'react';
import {View, Text} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {LocalizationContext} from '../Translations';
import OptionsSelectBox from './OptionsSelectBox';
import { getDeviceStyle } from '../../utils/responsive_util';
import { bodyFontSize } from '../../utils/font_size_util';

class AnonymousSelectBox extends React.Component {
  static contextType = LocalizationContext;

  render() {
    return (
      <View>
        <Text style={{marginTop: 5, fontSize: bodyFontSize()}}>
          { this.context.translations.other } ({ this.context.translations.anonymous })
        </Text>

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