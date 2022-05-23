import React from 'react';
import { Text, StyleSheet } from 'react-native';

import {LocalizationContext} from '../Translations';
import InputBox from '../Share/InputBox';

import Color from '../../themes/color';
import { bodyFontSize } from '../../utils/font_size_util';
import { getDeviceStyle } from '../../utils/responsive_util';

class BottomSheetPicker extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.formModalRef = React.createRef();
  }

  getLabel() {
    if (!this.props.items)
      return this.props.label || '';

    const selectedItem = this.props.items.filter(item => item.value === this.props.selectedItem);
    return selectedItem.length > 0 ? selectedItem[0].label : this.props.label;
  }

  showPicker() {
    if (this.props.disabled)
      return

    this.props.showPicker()
  }

  renderRightItem() {
    return <Text style={[styles.chooseLabel, this.props.disabled ? styles.disabledLabel : {}]}>
            {this.context.translations.choose}
           </Text>
  }

  render() {
    return (
      <InputBox
        title={this.props.title}
        isRequire={this.props.isRequire}
        label={this.getLabel()}
        subLabel={this.props.selectedItem}
        showSubLabel={this.props.showSubtitle}
        rightItem={this.renderRightItem()}
        onPress={() => this.showPicker()}
      />
    )
  }
}

const styles = StyleSheet.create({
  chooseLabel: {
    color: Color.clickableColor,
    paddingRight: getDeviceStyle(20, 12),
    textTransform: 'uppercase',
    fontSize: bodyFontSize()
  },
  disabledLabel: {
    color: Color.lightGrayColor
  }
});

export default BottomSheetPicker;

// How to call BottomSheetPicker
{/* <BottomSheetPicker
  title="Facilitator 1"
  label="Select facilitator"
  selectedItem={1}
  showSubtitle={true|false}
  showPicker={() => {}}
/> */}