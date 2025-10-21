import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Avatar } from 'react-native-paper';

import {LocalizationContext} from '../Translations';
import { containerPadding } from '../../utils/responsive_util';
import { smallTextFontSize, bodyFontSize } from '../../utils/font_size_util';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';

class MessageWithSteps extends React.Component {
  static contextType = LocalizationContext;
  renderListIcon(index) {
    if (this.props.isOrderList)
      return <Avatar.Text size={30} label={index + 1} style={{backgroundColor: Color.tipBgColor}} />

    return <Icon name="circle" size={6} color={Color.blackColor} style={{ marginTop: -2 }} />
  }

  renderList() {
    const fontSize = !!this.props.fontSize ? this.props.fontSize : smallTextFontSize();

    return this.props.steps.map((step, index) => {
      return (
        <View key={index} style={[styles.listItemContainer, this.props.listItemContainerStyle]}>
          { this.renderListIcon(index) }

          <Text style={{flexDirection: 'row', marginLeft: 6, flexWrap: 'nowrap'}}>
            { !!step.label &&
              <Text style={{fontFamily: FontFamily.title, fontSize: fontSize}}>{ step.label }: </Text>
            }
            <Text style={{fontSize: fontSize, fontFamily: FontFamily.body}}>{ step.description }</Text>
          </Text>
        </View>
      )
    });

  }

  render() {
    return (
      <View style={[{paddingHorizontal: containerPadding}, this.props.containerStyle]}>
        <Text style={[{fontSize: !!this.props.fontSize ? this.props.fontSize : smallTextFontSize(), fontFamily: FontFamily.body, flexWrap: 'nowrap'}, this.props.headerStyle]}>
          { this.props.header }:
        </Text>
        { this.renderList() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center'
  }
});

export default MessageWithSteps;