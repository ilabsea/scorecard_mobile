import React from 'react';
import { View, Text } from 'react-native';

import Color from '../../themes/color';
import {LocalizationContext} from '../Translations';
import CustomSelectPicker from '../CustomSelectPicker';
import { bodyFontSize, smallTextFontSize } from '../../utils/font_size_util';

let _this = null;

class SettingUrlEndpointPicker extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      selectedEndpoint: 'https://isaf-stg.digital-csc.org',
      isDropdownOpen: false,
    };
    _this = this;
  }

  changeEndpoint(item) {
    this.setState({ selectedEndpoint: item.value });
  }

  render() {
    const endpointUrls = [
      { label: 'ISAF Staging Server', value: 'https://isaf-stg.digital-csc.org' },
      { label: 'ISAF Production Server', value: 'https://isaf.digital-csc.org' },
    ];

    return (
      <View>
        <CustomSelectPicker
          items={endpointUrls}
          selectedItem={this.state.selectedEndpoint}
          onSelectItem={(item) => this.setState({ selectedEndpoint: item.value })}
        />
      </View>
    )
  }
}

export default SettingUrlEndpointPicker;