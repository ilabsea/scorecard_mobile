import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {LocalizationContext} from './Translations';
import { containerPadding } from '../utils/responsive_util';
import { smallTextFontSize } from '../utils/font_size_util';
import Color from '../themes/color';
import { FontFamily } from '../assets/stylesheets/theme/font';

class MessageWithSteps extends React.Component {
  static contextType = LocalizationContext;
  renderList() {
    return this.props.steps.map((step, index) => {
      return (
        <View key={index} style={{flexDirection: 'row', paddingLeft: 10}}>
          <Icon name="circle" size={6} color={Color.blackColor} style={{marginTop: 6}} />

          <Text style={{flexDirection: 'row', marginLeft: 6, flexWrap: 'nowrap'}}>
            { !!step.label &&
              <Text style={{fontFamily: FontFamily.title, fontSize: smallTextFontSize()}}>{ step.label }: </Text>
            }
            <Text style={{fontSize: smallTextFontSize()}}>{ step.description }</Text>
          </Text>
        </View>
      )
    });

  }

  render() {
    return (
      <View style={[{paddingHorizontal: containerPadding}, this.props.containerStyle]}>
        <Text style={[{fontSize: smallTextFontSize(), flexWrap: 'nowrap'}, this.props.headerStyle]}>
          { this.props.header }:
        </Text>
        { this.renderList() }
      </View>
    )
  }
}

export default MessageWithSteps;