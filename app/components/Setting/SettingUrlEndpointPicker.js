import React from 'react';
import { View } from 'react-native';

import {LocalizationContext} from '../Translations';
import SettingUrlEndpointForm from './SettingUrlEndpointForm';
import BottomSheetPicker from '../BottomSheetPicker/BottomSheetPicker';
import BottomSheetPickerContent from '../BottomSheetPicker/BottomSheetPickerContent';

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
      'form_create': { content: this.renderSettingUrlEndpointForm(), snapPoints: settingEndpointModalSnapPoints },
    };

    this.props.formRef.current?.setSnapPoints(modals[type].snapPoints);
    this.props.formRef.current?.setBodyContent(modals[type].content);
    this.props.formModalRef.current?.present();
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
            showEndpointUrlForm={() => this.showBottomSheetModal('form_create')}
            changeSelectedEndpoint={() => this.changeSelectedEndpoint()}
          />
  }

  saveNewEndpoint(endpointValue) {
    this.props.updateBackendUrl(endpointValue);
    this.loadEndpointUrls();
    setTimeout(() => {
      this.setState({ selectedEndpoint: endpointValue })
      this.props.formModalRef.current?.dismiss();
    }, 50);
  }

  renderSettingUrlEndpointForm() {
    return <SettingUrlEndpointForm saveNewEndpoint={this.saveNewEndpoint} endpointUrls={this.state.endpointUrls}/>
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
          label={translations.selectEndpointUrl}
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