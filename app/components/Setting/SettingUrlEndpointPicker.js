import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';

import {LocalizationContext} from '../Translations';
import SettingUrlEndpointForm from './SettingUrlEndpointForm';
import SettingUrlEndpointAddNewButton from './SettingUrlEndpointAddNewButton';
import BottomSheetPicker from '../BottomSheetPicker/BottomSheetPicker';
import BottomSheetPickerContent from '../BottomSheetPicker/BottomSheetPickerContent';

import endpointFormService from '../../services/endpoint_form_service';
import { settingEndpointModalSnapPoints, settingEndpointPickerSnapPoints, settingEndpointPickerContentHeight } from '../../constants/modal_constant';

const SettingUrlEndpointPicker = (props) => {
  const { translations } = useContext(LocalizationContext);
  const [ selectedEndpoint, setSelectedEndpoint ] = useState('');
  const [ endpointUrls, setEndpointUrls ] = useState([]);

  useEffect(() => {
    loadEndpointUrls();
  }, [selectedEndpoint]);

  async function loadEndpointUrls() {
    setEndpointUrls(await endpointFormService.getEndpointUrls());
    setSelectedEndpoint(props.backendUrl);
    endpointFormService.setTemporarySelectedEndpoint(selectedEndpoint);
  }

  function onChangeEndpoint(item) {
    setSelectedEndpoint(item.value);
    props.updateBackendUrl(item.value);
    props.formModalRef.current?.dismiss();
  }

  function saveNewEndpoint(endpointValue) {
    props.updateBackendUrl(endpointValue);
    loadEndpointUrls();
    setTimeout(() => {
      setSelectedEndpoint(endpointValue);
      props.formModalRef.current?.dismiss();
    }, 50);
  }

  function addNewUrlEnpointItem() {
    return <SettingUrlEndpointAddNewButton key={endpointUrls.length} onPress={() => showBottomSheetModal('form_create')} />
  }

  function showBottomSheetModal(type) {
    const modals = {
      'dropdown_picker': { content: renderBottomSheetPickerContent(), snapPoints: settingEndpointPickerSnapPoints },
      'form_create': { content: renderSettingUrlEndpointForm(), snapPoints: settingEndpointModalSnapPoints },
    };

    props.formRef.current?.setSnapPoints(modals[type].snapPoints);
    props.formRef.current?.setBodyContent(modals[type].content);
    props.formModalRef.current?.present();
  }

  function renderSettingUrlEndpointForm() {
    return <SettingUrlEndpointForm saveNewEndpoint={saveNewEndpoint} endpointUrls={endpointUrls}/>
  }

  function renderBottomSheetPickerContent() {
    return <BottomSheetPickerContent
            title={translations.serverUrl}
            isDynamicTitle={false}
            items={endpointUrls}
            selectedItem={selectedEndpoint}
            contentHeight={settingEndpointPickerContentHeight}
            onSelectItem={(item) => onChangeEndpoint(item)}
            lastListItem={addNewUrlEnpointItem()}
            scrollViewStyle={{ paddingBottom: 0 }}
            showSubtitle={true}
          />
  }

  return (
    <View style={{marginBottom: 30, marginTop: 5}}>
      <BottomSheetPicker
        title={translations.serverUrl}
        label={translations.selectEndpointUrl}
        items={endpointUrls}
        selectedItem={selectedEndpoint}
        showSubtitle={true}
        showPicker={() => showBottomSheetModal('dropdown_picker')}
        customContainerStyle={{ marginTop: 10 }}
      />
    </View>
  )
}

export default SettingUrlEndpointPicker;