import React, { useContext } from 'react';
import { View, Text } from 'react-native';

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
            <Text style={[{textAlign: 'center', marginTop: 10}, responsiveStyles.textLabel]}>{translations.version} { pkg.version }</Text>
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