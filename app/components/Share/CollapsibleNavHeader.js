import React from 'react';
import { Animated, View } from 'react-native';
import { Header, Left, Right } from "native-base";
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { HeaderBackButton } from '@react-navigation/stack';
import IonIcon from 'react-native-vector-icons/Ionicons'

import {LocalizationContext} from '../Translations';
import HeaderIconButton from '../Share/HeaderIconButton';
import CustomAlertMessage from '../Share/CustomAlertMessage';
import NavigationHeaderBody from '../NavigationHeaderBody';
import ProgressStep from '../ProgressStep';
import Color from '../../themes/color';
import { navigateBack, navigateHome } from '../../utils/navigation_util';
import { getDeviceStyle, navigationBackButtonFlex } from '../../utils/responsive_util';
import scorecardProgress from '../../db/jsons/scorecardProgress';

const headerMaxHeight = 156;
const headerMinHeight = 56;
const headerScrollDistance = (headerMaxHeight - headerMinHeight);

const CollapsibleNavHeader = (props) => {
  const {translations} = React.useContext(LocalizationContext);
  const [visibleModal, setVisibleModal] = React.useState(false)

  const headerHeight = props.scrollY.interpolate({
    inputRange: [0, headerScrollDistance],
    outputRange: [headerMaxHeight, headerMinHeight],
    extrapolate: 'clamp',
  });

  const progressOpacity = props.scrollY.interpolate({
    inputRange: [0, headerScrollDistance],
    outputRange: [1, 0],
    extrapolate: 'extend'
  });

  const tipIconOpacity = props.scrollY.interpolate({
    inputRange: [0, headerMaxHeight],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  const goToHomeScreen = () => {
    setVisibleModal(false)
    navigateHome();
  }

  const renderProgressStep = () => {
    const steps = scorecardProgress.map(x => translations[x.label]);
    return <Animated.View style={{marginTop: getDeviceStyle(10, 4), alignSelf: 'center', opacity: progressOpacity}}>
             <ProgressStep progressIndex={props.progressIndex} steps={!!props.isPassProposeStep ? steps : '' }/>
           </Animated.View>
  }

  const renderTipIcon = () => {
    return <Animated.View style={{opacity: tipIconOpacity, marginRight: 4}} >
              <HeaderIconButton onPress={() => props.showTipModal()}>
                <IonIcon name="bulb-outline" size={getDeviceStyle(24, wp('5.5%'))} color={Color.whiteColor} />
              </HeaderIconButton>
           </Animated.View>
  }

  const renderHeader = () => {
    return <Header backgroundColor={Color.headerColor} style={{elevation: 0}}>
            <View style={{flexGrow: 1}}>
              <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 6}}>
                <Left style={{flex: navigationBackButtonFlex, marginRight: getDeviceStyle(0, 10)}}>
                  <HeaderBackButton tintColor={Color.whiteColor} onPress={() => navigateBack()} style={{ marginLeft: getDeviceStyle(0, 10) }} />
                </Left>
                <NavigationHeaderBody title={props.title} />
                <Right style={{maxWidth: wp('14%'), marginRight: getDeviceStyle(-19, 6)}}>
                  {props.tipIconVisible && renderTipIcon()}
                  <HeaderIconButton onPress={() => setVisibleModal(true)} icon='home'/>
                </Right>
              </View>
              {renderProgressStep()}
            </View>
          </Header>
  }

  return (
    <Animated.View style={{position: 'absolute', top: 0, backgroundColor: Color.headerColor, height: headerHeight, width: '100%'}}>
      {renderHeader()}
      <CustomAlertMessage
        visible={visibleModal}
        title={translations.returnToHomeScreen}
        description={translations.doYouWantToReturnToHomeScreen}
        closeButtonLabel={translations.close}
        hasConfirmButton={true}
        confirmButtonLabel={translations.ok}
        isConfirmButtonDisabled={false}
        onDismiss={() => setVisibleModal(false)}
        onConfirm={() => goToHomeScreen()}
      />
    </Animated.View>
  )
}

export default CollapsibleNavHeader