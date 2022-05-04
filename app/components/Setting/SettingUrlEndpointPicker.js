import React from 'react';
import { View } from 'react-native';

import {LocalizationContext} from '../Translations';
import SettingUrlEndpointForm from './SettingUrlEndpointForm';
import BottomSheetPicker from '../BottomSheetPicker/BottomSheetPicker';
import BottomSheetPickerContent from '../BottomSheetPicker/BottomSheetPickerContent';
import EndpointUrlWarningMessages from '../EndpointUrlWarningMessages';

import endpointFormService from '../../services/endpoint_form_service';
import settingHelper from '../../helpers/setting_helper';
import { settingEndpointModalSnapPoints } from '../../constants/modal_constant';

class SettingUrlEndpointPicker extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      selectedEndpoint: '',
      currentSelectedEndpoint: '',
      endpointUrls: []
    }
  }

  componentDidMount() {
    this.loadEndpointUrls();
  }

  async loadEndpointUrls() {
    this.setState({
      endpointUrls: await endpointFormService.getEndpointUrls(),
      selectedEndpoint: this.props.backendUrl,
      currentSelectedEndpoint: this.props.backendUrl,
    });
  }

  showBottomSheetModal(type) {
    const modals = {
      'dropdown_picker': { content: this.renderBottomSheetPickerContent(), snapPoints: settingHelper.getEndpointPickerHeight('snap_points', this.state.endpointUrls) },
      'form_create': { content: this.renderSettingUrlEndpointForm(null), snapPoints: settingEndpointModalSnapPoints },
    };

    this.props.formRef.current?.setSnapPoints(modals[type].snapPoints);
    this.props.formRef.current?.setBodyContent(modals[type].content);
    this.props.formModalRef.current?.present();
  }

  showEditForm(item) {
    this.props.formRef.current?.setSnapPoints(settingEndpointModalSnapPoints);
    this.props.formRef.current?.setBodyContent(this.renderSettingUrlEndpointForm(item));
  }

  renderBottomSheetPickerContent() {
    return <BottomSheetPickerContent
            title={this.context.translations.serverUrl}
            items={this.state.endpointUrls}
            selectedItem={this.state.selectedEndpoint}
            isRequire={true}
            contentHeight={settingHelper.getEndpointPickerHeight('content', this.state.endpointUrls)}
            onSelectItem={(item) => this.setState({ currentSelectedEndpoint: item.value })}
            scrollViewStyle={{ paddingBottom: 0 }}
            showSubtitle={true}
            onPressRightButton={() => this.showBottomSheetModal('form_create')}
            changeSelectedEndpoint={() => this.changeSelectedEndpoint()}
            showEditForm={(item) => this.showEditForm(item)}
            hasAddButton={true}
            hasBottomButton={true}
            bottomInfoMessage={<EndpointUrlWarningMessages/>}
          />
  }

  saveNewEndpoint(endpointValue) {
    this.props.updateBackendUrl(endpointValue);
    this.setState({ selectedEndpoint: endpointValue });
    this.reloadEndpoint();
  }

  reloadEndpoint() {
    setTimeout(() => {
      this.loadEndpointUrls();
      this.props.formModalRef.current?.dismiss();
    }, 50);
  }

  renderSettingUrlEndpointForm(editEndpoint) {
    return <SettingUrlEndpointForm saveNewEndpoint={(endpointValue) => this.saveNewEndpoint(endpointValue)}
              endpointUrls={this.state.endpointUrls} editEndpoint={editEndpoint}
              selectedEndpoint={this.state.selectedEndpoint}
              reloadEndpoint={() => this.reloadEndpoint()}
           />
  }

  changeSelectedEndpoint() {
    this.setState({ selectedEndpoint: this.state.currentSelectedEndpoint });
    this.props.updateBackendUrl(this.state.currentSelectedEndpoint);
    this.props.formModalRef.current?.dismiss();
    endpointFormService.setTemporarySelectedEndpoint(this.state.currentSelectedEndpoint);
  }

  render() {
    const {translations} = this.context;
    return (
      <View style={{marginBottom: 30, marginTop: 5}}>
        <BottomSheetPicker
          title={translations.serverUrl}
          label={translations.selectServerUrl}
          items={this.state.endpointUrls}
          selectedItem={this.state.selectedEndpoint}
          isRequire={true}
          showSubtitle={true}
          showPicker={() => this.showBottomSheetModal('dropdown_picker')}
          customContainerStyle={{ marginTop: 10 }}
        />
      </View>
    )
  }
}

export default SettingUrlEndpointPicker;