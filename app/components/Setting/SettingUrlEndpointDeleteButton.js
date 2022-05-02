import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {LocalizationContext} from '../Translations';
import Color from '../../themes/color';
import { pressableItemSize } from '../../utils/component_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import { bodyFontSize } from '../../utils/font_size_util'
import endpointFormService from '../../services/endpoint_form_service';

import MessageModal from '../MessageModal';

class SettingUrlEndpointDeleteButton extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      visibleConfirmModal: false
    }

    this.isAllowToDelete = endpointFormService.isAllowToDelete(props.editEndpoint, props.selectedEndpoint);
  }

  deleteEndpoint() {
    this.setState({ visibleConfirmModal: false });
    endpointFormService.deleteEndpointUrl(this.props.editEndpoint);
    this.props.reloadEndpoint();
  }

  buttonColor() {
    return this.isAllowToDelete ? Color.redColor : Color.disabledBtnBg
  }

  render() {
    const { translations } = this.context;
    const endpointUrl = <Text style={{fontWeight: 'bold'}}>{ this.props.editEndpoint.value }</Text>

    return (
      <React.Fragment>
        <TouchableOpacity onPress={() => this.setState({ visibleConfirmModal: true })} style={styles.container} disabled={!this.isAllowToDelete}>
          <Icon name='delete' size={20} color={this.buttonColor()} style={{ padding: 0, marginTop: getDeviceStyle(-2, 0) }} />
          <Text style={[styles.label, { color: this.buttonColor() }]}>{ translations.deleteUrlEndpoint }</Text>
        </TouchableOpacity>

        <MessageModal
          visible={this.state.visibleConfirmModal}
          onDismiss={() => this.setState({ visibleConfirmModal: false })}
          description={translations.formatString(translations.doYouWantToDeleteThisUrlEndpoint, endpointUrl)}
          hasConfirmButton={true}
          confirmButtonLabel={translations.ok}
          onPressConfirmButton={() => this.deleteEndpoint()}
        />
      </React.Fragment>
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