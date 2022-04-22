import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import {LocalizationContext} from '../Translations';

import { getDeviceStyle } from '../../utils/responsive_util';
import BottomSheetPickerTabletStyles from '../../styles/tablet/BottomSheetPickerComponentStyle';
import BottomSheetPickerMobileStyles from '../../styles/mobile/BottomSheetPickerComponentStyle';

const styles = getDeviceStyle(BottomSheetPickerTabletStyles, BottomSheetPickerMobileStyles);

let  _this = null;

class BottomSheetPicker extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      listItems: props.items || [],
      label: props.label
    }

    this.formRef = React.createRef();
    this.formModalRef = React.createRef();
    _this = this;
  }

  componentDidUpdate() {
    if (!!this.props.items && this.props.items != this.state.listItems) {
      this.setState({
        listItems: this.props.items,
        label: this.getLabel()
      });
    }
  }

  getLabel() {
    const selectedItem = this.state.listItems.filter(item => item.value === this.props.selectedItem);
    return selectedItem.length > 0 ? selectedItem[0].label : this.props.label;
  }

  showPicker() {
    if (this.props.disabled)
      return

    this.props.showPicker()
  }

  render() {
    return (
      <View style={[styles.mainContainer, this.props.customContainerStyle]}>
        <Text style={styles.titleLabel}>{ this.props.title }</Text>

        <TouchableOpacity onPress={() => this.showPicker()}>
          <View style={styles.textContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.itemTitle}>{ this.getLabel() }</Text>
              { this.props.showSubtitle && <Text style={styles.itemSubtitle}>{ this.props.selectedItem }</Text> }
            </View>

            <Text style={styles.chooseLabel}>
              {this.context.translations.choose}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default BottomSheetPicker;

// How to call BottomSheetPicker
{/* <BottomSheetPicker
  title="Facilitator 1"
  label="Select facilitator"
  selectedItem={1}
  showSubtitle={true|false}
  showPicker={() => {}}
/> */}