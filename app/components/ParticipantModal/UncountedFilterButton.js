import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

import { LocalizationContext } from '../Translations';
import Color from '../../themes/color';
import { pressableItemSize } from '../../utils/component_util';
import { smallTextFontSize, smallIconSize } from '../../utils/font_size_util';
import { getDeviceStyle } from '../../utils/responsive_util';

class FilterUncountedButton extends React.Component {
  static contextType = LocalizationContext;
  state = {
    selected: false,
  }

  getColor() {
    return this.state.selected ? Color.clickableColor : Color.lightGrayColor;
  }

  renderCheckIcon = () => {
    if (this.state.selected) {
      return <MaterialIcon name='check' size={18} color={Color.clickableColor}
                style={{position: 'absolute', top: 0, right: 4, zIndex: 10}}
             />
    }
  }

  onPress = () => {
    this.props.toggleFilter(!this.state.selected);
    this.setState({ selected: !this.state.selected });
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.onPress()} style={[ styles.container, { borderColor: this.getColor() }]} >
        { this.renderCheckIcon() }
        <Icon name='ban' size={smallIconSize()} style={{paddingHorizontal: 10}} color={this.getColor()} />
        <Text style={{ color: this.getColor(), textAlign: 'center', fontSize: smallTextFontSize() }}>
          { this.context.translations.uncounted }
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: 10,
    width: getDeviceStyle(100, 80),
    height: pressableItemSize(getDeviceStyle(5, 0))
  }
});

export default FilterUncountedButton;