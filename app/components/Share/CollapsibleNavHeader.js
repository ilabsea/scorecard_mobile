import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import {LocalizationContext} from '../Translations';
import HeaderIconButton from '../Share/HeaderIconButton';
import AppbarHeader from '../Share/AppbarHeader';
import ConfirmationBottomSheetContent from './ConfirmationBottomSheetContent';
import DynamicHeightBottomSheetModal from '../DynamicHeightBottomSheetModal';
import ProgressStep from '../ProgressStep';
import Color from '../../themes/color';
import { navigateHome } from '../../utils/navigation_util';
import { getDeviceStyle, isSmallDiagonalScreen } from '../../utils/responsive_util';
import scorecardProgress from '../../db/jsons/scorecardProgress';

const headerMaxHeight = 156;
const headerMinHeight = 56;
const headerScrollDistance = (headerMaxHeight - headerMinHeight);

const CollapsibleNavHeader = (props) => {
  const {translations} = React.useContext(LocalizationContext);
  const confirmationModalRef = React.createRef();

  var initOutput = !!props.isPassProposeStep ? 204 : 186;
  if (isSmallDiagonalScreen())
    initOutput = !!props.isPassProposeStep ? 168 : 156;

  const headerHeight = props.scrollY.interpolate({
    inputRange: [0, headerScrollDistance, headerMaxHeight],
    outputRange: [initOutput, 56, 0],
    extrapolate: 'clamp',
  });

  const progressOpacity = props.scrollY.interpolate({
    inputRange: [0, headerScrollDistance],
    outputRange: [1, 0],
    extrapolate: 'extend'
  });

  const tipIconOpacity = props.scrollY.interpolate({
    inputRange: [0, headerMaxHeight / 2, headerMaxHeight],
    outputRange: [0, 1, 1],
    extrapolate: 'clamp',
  })

  const goToHomeScreen = () => {
    confirmationModalRef.current?.dismiss();
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
                <MaterialIcon name="lightbulb-on-outline" size={getDeviceStyle(27, wp('6%'))} color={Color.whiteColor} style={{marginTop: -5}} />
              </HeaderIconButton>
           </Animated.View>
  }

  const renderHeader = () => {
    return (
      <View style={{backgroundColor: Color.headerColor}}>
        <AppbarHeader
          title={props.title}
          rightButton={props.tipIconVisible && renderTipIcon()}
          onPressHome={() => {

            confirmationModalRef.current?.setContent(
              <ConfirmationBottomSheetContent
                title={translations.returnToHomeScreen}
                confirmationMessage={translations.doYouWantToReturnToHomeScreen}
                onPress={() => goToHomeScreen()}
              />
            );
            confirmationModalRef.current?.present();
          }}
        />
        {renderProgressStep()}
      </View>
    );
  }

  return (
    <Animated.View style={{position: 'absolute', top: 0, backgroundColor: Color.headerColor, height: headerHeight, width: '100%'}}>
      {renderHeader()}
      <DynamicHeightBottomSheetModal ref={confirmationModalRef} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.headerColor,
    elevation: 0
  }
});

export default CollapsibleNavHeader