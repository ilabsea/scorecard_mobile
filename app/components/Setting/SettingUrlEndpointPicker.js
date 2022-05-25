import React from 'react';
import { View } from 'react-native';

import {LocalizationContext} from '../Translations';
import BottomSheetPicker from '../BottomSheetPicker/BottomSheetPicker';
import BottomSheetPickerContent from '../BottomSheetPicker/BottomSheetPickerContent';
import SettingUrlEndpointWarningMessages from './SettingUrlEndpointWarningMessages';
import SettingUrlEndpointPickerItem from './SettingUrlEndpointPickerItem';

import endpointFormService from '../../services/endpoint_form_service';
import settingHelper from '../../helpers/setting_helper';
import { settingEndpointModalSnapPoints } from '../../constants/modal_constant';
import EndpointUrl from '../../models/EndpointUrl';
import { navigate } from '../../navigators/app_navigator';

class SettingUrlEndpointPicker extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      selectedEndpoint: '',
      currentSelectedEndpoint: '',
      endpointUrls: [],
    }
    this.componentIsUnmount = false;
  }

  componentDidMount() {
    this.loadEndpointUrls();

    this.focusListener = this.props.navigation.addListener("focus", () => {
      setTimeout(async () => {
        const settingData = await settingHelper.getSettingData();
        if (!this.componentIsUnmount && !!settingData && !!settingData.backendUrl) {
          this.setState({
            endpointUrls: EndpointUrl.getAll(),
            selectedEndpoint: settingData.backendUrl
          });
          this.props.formModalRef.current?.dismiss();
          this.props.updateBackendUrl(settingData.backendUrl);
        }
      }, 100);
    });
  }

  componentDidUpdate() {
    if (!this.componentIsUnmount && this.state.selectedEndpoint != this.props.backendUrl)
      this.setState({ selectedEndpoint: this.props.backendUrl })
  }

  componentWillUnmount() {
    this.focusListener && this.focusListener();
    this.componentIsUnmount = true;
  }

  loadEndpointUrls() {
    this.setState({
      endpointUrls: EndpointUrl.getAll(),
      selectedEndpoint: this.props.backendUrl,
      currentSelectedEndpoint: this.props.backendUrl,
    });
  }

  showBottomSheetModal(type) {
    const modals = {
      'dropdown_picker': { content: this.renderBottomSheetPickerContent(), snapPoints: settingHelper.getEndpointPickerHeight('snap_points', this.state.endpointUrls) },
    };

    this.props.formRef.current?.setSnapPoints(modals[type].snapPoints);
    this.props.formRef.current?.setBodyContent(modals[type].content);
    this.props.formModalRef.current?.present();
  }

  showEditForm(item) {
    // this.props.formRef.current?.setSnapPoints(settingEndpointModalSnapPoints);

    console.log('redirect to edit screen ==== ')
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
            onPressRightButton={() => navigate('AddNewEndpointUrl')}
            onPressBottomButton={() => this.changeSelectedEndpoint()}
            showEditForm={(item) => this.showEditForm(item)}
            hasAddButton={true}
            hasBottomButton={true}
            bottomInfoMessage={<SettingUrlEndpointWarningMessages/>}
            isSelctedItemMatched={(selectedEndpoint) => selectedEndpoint === this.props.backendUrl}
            isAllowToEdit={(editItem, selectedItem) => endpointFormService.isAllowToDeleteOrEdit(editItem, selectedItem, this.props.savedEndpoint)}
            customListItem={(item) => <SettingUrlEndpointPickerItem item={item}/>}
          />
  }

  saveNewEndpoint(endpointValue) {
    this.props.updateBackendUrl(endpointValue);
    this.setState({ selectedEndpoint: endpointValue });
    this.reloadEndpoint();
    this.props.saveTempSettingData();
  }

  reloadEndpoint() {
    setTimeout(() => {
      this.loadEndpointUrls();
      this.props.formModalRef.current?.dismiss();
    }, 100);
  }

  changeSelectedEndpoint() {
    this.setState({ selectedEndpoint: this.state.currentSelectedEndpoint });
    this.props.updateBackendUrl(this.state.currentSelectedEndpoint);
    this.props.formModalRef.current?.dismiss();
    this.props.saveTempSettingData();
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