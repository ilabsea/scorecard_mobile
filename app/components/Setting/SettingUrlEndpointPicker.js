import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';

import {LocalizationContext} from '../Translations';
import CustomDropdownPicker from '../CustomDropdownPicker/CustomDropdownPicker';
import SettingUrlEndpointForm from './SettingUrlEndpointForm';
import endpointFormService from '../../services/endpoint_form_service';

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
  }

  function onChangeEndpoint(item) {
    setSelectedEndpoint(item.value);
    props.updateBackendUrl(item.value);
  }

  function saveNewEndpoint(endpointLabel, endpointValue) {
    props.updateBackendUrl(endpointValue);
    loadEndpointUrls();
    setTimeout(() => {
      setSelectedEndpoint(endpointValue);
    }, 50);
  }

  return (
    <View style={{marginBottom: 15}}>
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
      />

      <SettingUrlEndpointForm saveNewEndpoint={saveNewEndpoint} endpointUrls={endpointUrls} />
    </View>
  )
}

export default SettingUrlEndpointPicker;