import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';

import {LocalizationContext} from '../Translations';
import CustomDropdownPicker from '../CustomDropdownPicker/CustomDropdownPicker';
import SettingUrlEndpointForm from './SettingUrlEndpointForm';
import SettingUrlEndpointAddNewButton from './SettingUrlEndpointAddNewButton';
import endpointFormService from '../../services/endpoint_form_service';
import { settingEndpointModalSnapPoints } from '../../constants/modal_constant';

const SettingUrlEndpointPicker = (props) => {
  const { translations } = useContext(LocalizationContext);
  const [ selectedEndpoint, setSelectedEndpoint ] = useState('');
  const [ endpointUrls, setEndpointUrls ] = useState([]);

  useEffect(() => {
    loadEndpointUrls();
  }, [selectedEndpoint]);

  async function loadEndpointUrls() {
    setEndpointUrls(await endpointFormService.getEndpointUrls(props.backendUrl));
    setSelectedEndpoint(props.backendUrl);
  }

  function onChangeEndpoint(item) {
    setSelectedEndpoint(item.value);
    props.updateBackendUrl(item.value);
  }

  function saveNewEndpoint(endpointValue) {
    props.updateBackendUrl(endpointValue);
    loadEndpointUrls();
    setTimeout(() => {
      setSelectedEndpoint(endpointValue);
      props.formModalRef.current?.dismiss();
    }, 50);
  }

  function openForm() {
    props.formRef.current?.setSnapPoints(settingEndpointModalSnapPoints);
    props.formRef.current?.setBodyContent(<SettingUrlEndpointForm saveNewEndpoint={saveNewEndpoint} endpointUrls={endpointUrls}/>);
    props.formModalRef.current?.present();
    props.closeDropDown();
  }

  function addNewUrlEnpointItem() {
    return <SettingUrlEndpointAddNewButton onPress={() => openForm()} />
  }

  return (
    <View style={{marginBottom: 30, marginTop: 5}}>
      <CustomDropdownPicker
        id={1}
        openId={props.openPickerId}
        setOpenId={(openId) => props.setOpenPickerId(openId)}
        items={endpointUrls}
        selectedItem={selectedEndpoint}
        zIndex={6000}
        label={translations.serverUrl}
        isRequired={true}
        itemIndex={0}
        showSubtitle={true}
        customWrapperStyle={{ marginBottom: 0, marginTop: 5 }}
        onSelectItem={(item) => onChangeEndpoint(item)}
        lastListItem={addNewUrlEnpointItem()}
      />
    </View>
  )
}

export default SettingUrlEndpointPicker;