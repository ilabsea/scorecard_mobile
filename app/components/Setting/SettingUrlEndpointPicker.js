import React from 'react';
import { View, Text } from 'react-native';

import {LocalizationContext} from '../Translations';
import BottomSheetPicker from '../BottomSheetPicker/BottomSheetPicker';
import BottomSheetPickerContent from '../BottomSheetPicker/BottomSheetPickerContent';
import SettingUrlEndpointWarningMessages from './SettingUrlEndpointWarningMessages';
import SettingUrlEndpointPickerItem from './SettingUrlEndpointPickerItem';
import SettingUrlEndpointDeleteModal from './SettingUrlEndpointDeleteModal';

import settingHelper from '../../helpers/setting_helper';
import endpointFormHelper from '../../helpers/endpoint_form_helper';
import { settingEndpointModalSnapPoints, settingEndpointContentHeight } from '../../constants/modal_constant';
import EndpointUrl from '../../models/EndpointUrl';
import Scorecard from '../../models/Scorecard';
import { navigate } from '../../navigators/app_navigator';
import { bodyFontSize } from '../../utils/font_size_util';
import Color from '../../themes/color';

class SettingUrlEndpointPicker extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      currentSelectedEndpoint: '',
      endpointUrls: [],
      visibleConfirmModal: false,
    }
    this.componentIsUnmount = false;
    this.defaultSavedEndpointUrl = '';
    this.hasNewEndpointAdded = false;
    this.endpointToDelete = null;
    this.pickerContentRef = React.createRef();
  }

  async componentDidMount() {
    this.defaultSavedEndpointUrl = await settingHelper.getSavedEndpointUrl();
    this.loadEndpointUrls(null);

    this.focusListener = this.props.navigation.addListener("focus", () => {
      setTimeout(async () => {
        const settingData = await settingHelper.getSettingData();
        if (!this.componentIsUnmount && !!settingData && !!settingData.backendUrl) {
          this.setState({
            endpointUrls: EndpointUrl.getAll(),
            currentSelectedEndpoint: settingData.backendUrl
          });

          this.hasNewEndpointAdded = await endpointFormHelper.hasNewEndpointAdded()
          if(this.hasNewEndpointAdded)
            this.props.formModalRef.current?.dismiss();

          this.props.updateSelectedEndpointUrl(settingData.backendUrl);
        }
      }, 50);
    });
  }

  componentWillUnmount() {
    this.focusListener && this.focusListener();
    this.componentIsUnmount = true;
  }

  loadEndpointUrls(callback) {
    this.setState({
      endpointUrls: EndpointUrl.getAll(),
      currentSelectedEndpoint: this.defaultSavedEndpointUrl,
    }, () => !!callback && callback());
  }

  async showBottomSheetModal() {
    this.defaultSavedEndpointUrl = await settingHelper.getSavedEndpointUrl();

    this.props.formRef.current?.setSnapPoints(settingEndpointModalSnapPoints);
    this.props.formRef.current?.setBodyContent(this.renderBottomSheetPickerContent());
    this.props.formModalRef.current?.present();
  }

  isDeletable(endpointUrl) {
    if (Scorecard.allScorecardContainEndpoint(endpointUrl))
      return false;

    return endpointUrl != this.props.selectedEndpointUrl && endpointUrl != this.defaultSavedEndpointUrl;
  }

  renderBottomSheetPickerContent() {
    return <BottomSheetPickerContent
            ref={this.pickerContentRef}
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
            showConfirmDelete={(item) => this.showConfirmDelete(item)}
            hasAddButton={true}
            hasBottomButton={true}
            bottomInfoMessage={<SettingUrlEndpointWarningMessages/>}
            isSelctedItemMatched={(selectedEndpoint) => selectedEndpoint === this.props.selectedEndpointUrl}
            isDeletable={(endpointUrl) => this.isDeletable(endpointUrl)}
            customListItem={(item) => <SettingUrlEndpointPickerItem item={item}/>}
          />
  }

  showConfirmDelete(endpointUrl) {
    this.endpointToDelete = endpointUrl;
    this.setState({ visibleConfirmModal: true });
  }

  changeSelectedEndpoint() {
    this.props.updateSelectedEndpointUrl(this.state.currentSelectedEndpoint);
    this.props.formModalRef.current?.dismiss();
    this.props.saveTempSettingData();
  }

  renderConfirmModal() {
    if (!this.endpointToDelete)
      return;

    return <SettingUrlEndpointDeleteModal
              visible={this.state.visibleConfirmModal}
              endpointToDelete={this.endpointToDelete}
              onDismiss={() => this.setState({ visibleConfirmModal: false })}
              deleteEndpoint={() => this.deleteEndpoint()}
            />
  }

  deleteEndpoint() {
    EndpointUrl.destroy(this.endpointToDelete.uuid);
    this.endpointToDelete = null;
    this.setState({ visibleConfirmModal: false });
    this.loadEndpointUrls(() => this.pickerContentRef.current?.updateItems(this.state.endpointUrls));
  }

  render() {
    const {translations} = this.context;
    return (
      <View style={{marginBottom: this.hasNewEndpointAdded ? 10 : 30, marginTop: 5}}>
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

        { this.hasNewEndpointAdded &&
          <Text style={{fontSize: bodyFontSize(), color: Color.errorColor}}>
            { translations.theServerUrlHasChanged }
          </Text>
        }

        { this.renderConfirmModal() }
      </View>
    )
  }
}

export default SettingUrlEndpointPicker;