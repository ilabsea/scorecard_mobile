import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {LocalizationContext} from '../Translations';
import Color from '../../themes/color';
import { pressableItemSize } from '../../utils/component_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import { bodyFontSize } from '../../utils/font_size_util'
import EndpointUrl from '../../models/EndpointUrl';

import MessageModal from '../MessageModal';

class SettingUrlEndpointDeleteButton extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      visibleConfirmModal: false
    }

    this.endpointLabel = this.getBoldLabel(props.editEndpoint.label);
    this.endpointUrl = this.getBoldLabel(props.editEndpoint.value);
  }

  deleteEndpoint() {
    this.setState({ visibleConfirmModal: false });
    this.endpointLabel = '';
    this.endpointUrl = '';
    EndpointUrl.destroy(this.props.endpointUuid);
    this.props.reloadEndpoint();
  }

  buttonColor() {
    return this.props.isAllowToDeleteOrEdit ? Color.redColor : Color.disabledBtnBg
  }

  getBoldLabel(label) {
    return <Text style={{fontWeight: 'bold'}}>{ label }</Text>
  }

  render() {
    const { translations } = this.context;

    return (
      <React.Fragment>
        <TouchableOpacity onPress={() => this.setState({ visibleConfirmModal: true })} style={[styles.container, { marginTop: getDeviceStyle(0, -10) }]}
          disabled={!this.props.isAllowToDeleteOrEdit}
        >
          <Icon name='delete' size={20} color={this.buttonColor()} style={{ padding: 0, marginTop: -2 }} />
          <Text style={[styles.label, { color: this.buttonColor() }]}>{ translations.deleteServerUrl }</Text>
        </TouchableOpacity>

        <MessageModal
          visible={this.state.visibleConfirmModal}
          onDismiss={() => this.setState({ visibleConfirmModal: false })}
          description={translations.formatString(translations.doYouWantToDeleteThisServerUrl, this.endpointLabel, this.endpointUrl)}
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