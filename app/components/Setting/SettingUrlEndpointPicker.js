import React, { useEffect, useState, useContext } from 'react';
import { View, Text } from 'react-native';

import Color from '../../themes/color';
import {LocalizationContext} from '../Translations';
import CustomSelectPicker from '../CustomSelectPicker';
// import { bodyFontSize, smallTextFontSize } from '../../utils/font_size_util';
// import { environment } from '../../config/environment';

const SettingUrlEndpointPicker = (props) => {
  const { translations } = useContext(LocalizationContext);
  const [ selectedEndpoint, setSelectedEndpoint ] = useState(props.backendUrl);
  const endpointUrls = [
    { label: 'ISAF Staging Server', value: 'https://isaf-stg.digital-csc.org' },
    { label: 'ISAF Production Server', value: 'https://isaf.digital-csc.org' },
  ];

  function onChangeEndpoint(item) {
    setSelectedEndpoint(item.value);
    props.updateBackendUrl(item.value);
  }

  return (
    <View>
      <CustomSelectPicker
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
        customWrapperStyle={{ marginBottom: 32 }}
        onSelectItem={(item) => onChangeEndpoint(item)}
      />
    </View>
  )
}

export default SettingUrlEndpointPicker;