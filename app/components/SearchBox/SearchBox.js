import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-paper';

import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { pressableItemSize } from '../../utils/component_util';
import { bodyFontSize } from '../../utils/font_size_util';
import { textLineHeight } from '../../constants/component_style_constant';

import { LocalizationContext } from '../../components/Translations';

const placeholderColor = '#656565';
class SearchBox extends React.Component {
  static contextType = LocalizationContext;

  renderIcon = (icon, iconSize, onPress) => {
    return <TextInput.Icon
              icon={() => (
                <Icon
                  name={icon}
                  size={iconSize}
                  color={placeholderColor}
                />
              )}
              onPress={() => !!onPress && onPress()}
              style={{height: pressableItemSize(), width: pressableItemSize()}}
           />
  }

  render() {
    const { translations } = this.context;

    return (
      <View style={[styles.container, this.props.containerStyle]}>
          <TextInput
            value={this.props.value}
            mode="flat"
            placeholder={this.props.placeholder || translations.searchLocation}
            placeholderTextColor={placeholderColor}
            left={this.renderIcon("search", 24, null)}
            right={ !!this.props.value && this.renderIcon("close", 24, () => this.props.onClearSearch())}
            style={[styles.inputContainer, this.props.inputContainerStyle]}
            underlineColor="transparent"
            activeUnderlineColor='transparent'
            cursorColor={Color.clickableColor}
            onChangeText={(text) => this.props.onChangeText(text)}
            onFocus={() => !!this.props.onFocus && this.props.onFocus(true)}
            onBlur={() => !!this.props.onBlur && this.props.onBlur(false)}
            contentStyle={{fontFamily: FontFamily.body, fontSize: bodyFontSize(), lineHeight: textLineHeight}}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderColor: '#bababa',
    flex: 1,
    backgroundColor: Color.paleGrayColor,
  },
  container: {
    backgroundColor: Color.whiteColor,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingBottom: 5,
    borderBottomColor: Color.paleGrayColor,
    flexDirection: 'row',
    marginTop: 5,
  },
});

export default SearchBox;