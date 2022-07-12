import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { LocalizationContext } from '../Translations';
import ActionButton from '../ActionButton';
import MessageLabel from '../MessageLabel';
import LockSignInMessage from './LockSignInMessage';
import CustomAlertMessage from '../Share/CustomAlertMessage';

import pkg from '../../../package';
import { navigate } from '../../navigators/app_navigator';
import { getDeviceStyle } from '../../utils/responsive_util';
import SettingStyleTabletStyles from '../../styles/tablet/SettingScreenStyle';
import SettingStyleMobileStyles from '../../styles/mobile/SettingScreenStyle';

const responsiveStyles = getDeviceStyle(SettingStyleTabletStyles, SettingStyleMobileStyles);

const SettingFooter = (props) => {
  const { translations } = useContext(LocalizationContext);
  const [deviceId, setDeviceId] = useState('');

  useEffect(() => {
    DeviceInfo.getAndroidId().then((androidId) => {
      setDeviceId(androidId);
    });
  }, [])

  function renderErrorMsg() {
    if (props.isLocked)
      return <LockSignInMessage unlockAt={props.unlockAt} />

    return (
      <MessageLabel
        message={translations[props.errorMsg]}
        type={props.messageType}
        customStyle={responsiveStyles.messageContainer}
      />
    );
  }

  function renderButton() {
    return <React.Fragment>
            <ActionButton
              label={translations.save}
              onPress={() => props.save()}
              isDisabled={props.isLoading || !props.isValid || props.isLocked}
              customButtonStyle={{marginTop: 2}}
            />

            <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'space-between' }}>
              <Text style={responsiveStyles.textLabel}>ID: { deviceId }</Text>
              <Text style={responsiveStyles.textLabel}>{translations.version} { pkg.version }</Text>
            </View>
           </React.Fragment>
  }

  function renderModal() {
    return  <CustomAlertMessage
              visible={props.visibleModal}
              title={translations.unableToChangeTheServerUrl}
              description={translations.scorecardRemainingMessage}
              closeButtonLabel={translations.infoCloseLabel}
              hasConfirmButton={true}
              confirmButtonLabel={translations.viewDetail}
              isConfirmButtonDisabled={false}
              onDismiss={() => props.dismissModal()}
              onConfirm={() => goToScorecardList()}
            />
  }

  function goToScorecardList() {
    props.dismissModal();
    navigate('ScorecardList');
  }

  return (
    <View>
      { renderErrorMsg() }
      { renderButton() }
      { renderModal() }
    </View>
  )
}

export default SettingFooter;