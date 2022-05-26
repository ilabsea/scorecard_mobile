import React from 'react';
import { View } from 'react-native';

import {LocalizationContext} from '../Translations';
import BottomSheetPicker from '../BottomSheetPicker/BottomSheetPicker';
import BottomSheetPickerContent from '../BottomSheetPicker/BottomSheetPickerContent';
import SettingUrlEndpointWarningMessages from './SettingUrlEndpointWarningMessages';
import SettingUrlEndpointPickerItem from './SettingUrlEndpointPickerItem';

import endpointFormService from '../../services/endpoint_form_service';
import settingHelper from '../../helpers/setting_helper';
import { settingEndpointModalSnapPoints, settingEndpointContentHeight } from '../../constants/modal_constant';
import EndpointUrl from '../../models/EndpointUrl';
import Scorecard from '../../models/Scorecard';
import { navigate } from '../../navigators/app_navigator';

class SettingUrlEndpointPicker extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      currentSelectedEndpoint: '',
      endpointUrls: [],
    }
    this.componentIsUnmount = false;
    this.defaultSavedEndpointUrl = '';
  }

  async componentDidMount() {
    this.defaultSavedEndpointUrl = await settingHelper.getSavedEndpointUrl();
    this.loadEndpointUrls();

    this.focusListener = this.props.navigation.addListener("focus", () => {
      setTimeout(async () => {
        const settingData = await settingHelper.getSettingData();
        if (!this.componentIsUnmount && !!settingData && !!settingData.backendUrl) {
          this.setState({
            endpointUrls: EndpointUrl.getAll(),
            currentSelectedEndpoint: settingData.backendUrl
          });
          if (settingData.backendUrl != this.defaultSavedEndpointUrl)
            this.props.formModalRef.current?.dismiss();

          this.props.updateSelectedEndpointUrl(settingData.backendUrl);
        }
      }, 100);
    });
  }

  componentWillUnmount() {
    this.focusListener && this.focusListener();
    this.componentIsUnmount = true;
  }

  loadEndpointUrls() {
    this.setState({
      endpointUrls: EndpointUrl.getAll(),
      currentSelectedEndpoint: this.defaultSavedEndpointUrl,
    });
  }

  showBottomSheetModal() {
    this.props.formRef.current?.setSnapPoints(settingEndpointModalSnapPoints);
    this.props.formRef.current?.setBodyContent(this.renderBottomSheetPickerContent());
    this.props.formModalRef.current?.present();
  }

  showEditForm(endpoint) {
    endpointFormService.saveEndpointForEdit(endpoint);
    navigate('AddNewEndpointUrl');
  }

  isAllowToEdit(endpointUrl) {
    if (Scorecard.allScorecardContainEndpoint(endpointUrl))
      return false;

    return endpointUrl != this.props.selectedEndpointUrl && endpointUrl != this.defaultSavedEndpointUrl;
  }

  renderBottomSheetPickerContent() {
    return <BottomSheetPickerContent
            title={this.context.translations.serverUrl}
            items={this.state.endpointUrls}
            selectedItem={this.state.currentSelectedEndpoint}
            isRequire={true}
            contentHeight={settingEndpointContentHeight}
            onSelectItem={(item) => this.setState({ currentSelectedEndpoint: item.value })}
            scrollViewStyle={{ paddingBottom: 0 }}
            showSubtitle={true}
            onPressRightButton={() => navigate('AddNewEndpointUrl')}
            onPressBottomButton={() => this.changeSelectedEndpoint()}
            showEditForm={(item) => this.showEditForm(item)}
            hasAddButton={true}
            hasBottomButton={true}
            bottomInfoMessage={<SettingUrlEndpointWarningMessages/>}
            isSelctedItemMatched={(selectedEndpoint) => selectedEndpoint === this.props.selectedEndpointUrl}
            isAllowToEdit={(endpointUrl) => this.isAllowToEdit(endpointUrl)}
            customListItem={(item) => <SettingUrlEndpointPickerItem item={item}/>}
          />
  }

  changeSelectedEndpoint() {
    this.props.updateSelectedEndpointUrl(this.state.currentSelectedEndpoint);
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
          selectedItem={this.state.currentSelectedEndpoint}
          isRequire={true}
          showSubtitle={true}
          showPicker={() => this.showBottomSheetModal()}
          customContainerStyle={{ marginTop: 10 }}
        />
      </View>
    )
  }
}

export default SettingUrlEndpointPicker;