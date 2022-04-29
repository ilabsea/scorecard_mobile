import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {LocalizationContext} from '../Translations';
import Color from '../../themes/color';
import { pressableItemSize } from '../../utils/component_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import { bodyFontSize } from '../../utils/font_size_util'
import endpointFormService from '../../services/endpoint_form_service';

class SettingUrlEndpointDeleteButton extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.isAllowToDelete = endpointFormService.isAllowToDelete(props.editEndpoint, props.selectedEndpoint);
  }

  deleteEndpoint() {
    endpointFormService.deleteEndpointUrl(this.props.editEndpoint);
    this.props.reloadEndpoint();
  }

  buttonColor() {
    return this.isAllowToDelete ? Color.redColor : Color.disabledBtnBg
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.deleteEndpoint()} style={styles.container}>
        <Icon name='delete' size={20} color={this.buttonColor()} style={{ padding: 0, marginTop: getDeviceStyle(-2, 0) }} />
        <Text style={[styles.label, { color: this.buttonColor() }]}>{ this.context.translations.deleteUrlEndpoint }</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minHeight: pressableItemSize(),
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  label: {
    marginLeft: 5,
    fontSize: bodyFontSize(),
  }
});

export default SettingUrlEndpointDeleteButton;