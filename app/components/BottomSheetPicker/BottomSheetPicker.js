import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import {LocalizationContext} from '../Translations';

import { getDeviceStyle } from '../../utils/responsive_util';
import BottomSheetPickerTabletStyles from '../../styles/tablet/BottomSheetPickerComponentStyle';
import BottomSheetPickerMobileStyles from '../../styles/mobile/BottomSheetPickerComponentStyle';

const styles = getDeviceStyle(BottomSheetPickerTabletStyles, BottomSheetPickerMobileStyles);

class BottomSheetPicker extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
    this.formModalRef = React.createRef();
  }

  render() {
    return (
      <View style={[styles.mainContainer, this.props.customContainerStyle]}>
        <Text style={styles.titleLabel}>{ this.props.title }</Text>

        <TouchableOpacity onPress={() => this.props.showModal()}>
          <View style={styles.textContainer}>
            {/* Selected value or label */}
            <Text style={styles.valueLabel}>{ this.props.selectedItemLabel || this.props.label }</Text>

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
  showModal={() => {}}
/> */}