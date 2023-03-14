import React from 'react';
import { Animated, View, Text } from 'react-native';
import { Header, Left, Right, Title } from "native-base";
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { HeaderBackButton } from '@react-navigation/stack';

import {LocalizationContext} from '../Translations';
import ProgressHeader from '../Share/ProgressHeader';
import HeaderIconButton from '../Share/HeaderIconButton';
import CustomAlertMessage from '../Share/CustomAlertMessage';
import NavigationHeaderBody from '../NavigationHeaderBody';
import ProgressStep from '../ProgressStep';
import Color from '../../themes/color';
import { navigateBack, navigateHome } from '../../utils/navigation_util';
import { getDeviceStyle, navigationBackButtonFlex, navigationTitlePaddingLeft } from '../../utils/responsive_util';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { navigationHeaderTitleFontSize } from '../../utils/font_size_util';

// const headerWithAudioMaxHeight = getDeviceStyle(265, 230);
const headerMaxHeight = getDeviceStyle(156, 230);
const headerMinHeight = 64;
const headerScrollDistance = (headerMaxHeight - headerMinHeight);

const ProposedIndicatorNavHeader = (props) => {
  // const contextType = LocalizationContext;
  // const {translations} = context;
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

  const renderProgressStep = () => {
    return <Animated.View style={{marginTop: getDeviceStyle(10, 4), alignSelf: 'center', opacity: progressOpacity}}>
             <ProgressStep progressIndex={3} steps={!!props.steps && props.steps}/>
           </Animated.View>
  }

  return (
    <Animated.View style={{position: 'absolute', top: 0, zIndex: 1, backgroundColor: 'green', height: headerHeight, width: '100%'}}>
      <View style={{borderWidth: 1, flexGrow: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 6}}>
          <Left style={{flex: navigationBackButtonFlex}}>
            <HeaderBackButton tintColor={Color.whiteColor} onPress={() => navigateBack()} style={{ marginLeft: 0 }} />
          </Left>

          <NavigationHeaderBody title={'ការបំផុសលក្ខណៈវិនិច្ឆ័យ'} />
          {/* <Title style={{fontSize: navigationHeaderTitleFontSize(), fontFamily: FontFamily.title, textTransform: 'capitalize'}}>
            ការបំផុសលក្ខណៈវិនិច្ឆ័យ
          </Title> */}

          {/* <Right style={{maxWidth: wp('14%'), marginRight: getDeviceStyle(-19, -6)}}> */}
          <Right style={{maxWidth: wp('14%'), borderWidth: 1, marginRight: 0}}>
            <HeaderIconButton onPress={() => setVisibleModal(true)} icon='home' />
          </Right>
        </View>
        {/* {renderProgressStep()} */}
      </View>
      <CustomAlertMessage
        visible={visibleModal}
        // title={translations.returnToHomeScreen}
        // description={translations.doYouWantToReturnToHomeScreen}
        // closeButtonLabel={translations.close}
        title={'Return home?'}
        description={'Do you really want to return home?'}
        closeButtonLabel={'Close'}
        hasConfirmButton={true}
        // confirmButtonLabel={translations.ok}
        confirmButtonLabel={'Ok'}
        isConfirmButtonDisabled={false}
        onDismiss={() => setVisibleModal(false)}
        onConfirm={() => {}}
      />
    </Animated.View>
  )
}

export default ProposedIndicatorNavHeader