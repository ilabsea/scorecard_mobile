import React, {useContext, useEffect} from 'react';
import { HeaderBackButton } from '@react-navigation/stack';
import { View, Text } from "react-native";

import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage'; // 1
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

// Screens
import HomeScreen from '../screens/Home/Home';
import SettingScreen from '../screens/Setting/Setting';
import NewScorecardScreen from '../screens/NewScorecard/NewScorecard';
import ScorecardDetailScreen from '../screens/ScorecardDetail/ScorecardDetail';
import ScorecardPreferenceScreen from '../screens/ScorecardPreference/ScorecardPreference';
import FacilitatorScreen from '../screens/Facilitator/Facilitator';
import ScorecardListScreen from '../screens/ScorecardList/ScorecardList';
import ScorecardProgressScreen from '../screens/ScorecardProgress/ScorecardProgress';
import IndicatorDevelopmentScreen from '../screens/IndicatorDevelopment/IndicatorDevelopment';
import VotingIndicatorFormScreen from '../screens/VotingIndicatorForm/VotingIndicatorForm';
import VotingIndicatorListScreen from '../screens/VotingIndicatorList/VotingIndicatorList';
import ProposedIndicatorScreen from '../screens/ProposedIndicator/ProposedIndicator';
import ProposeNewIndicatorScreen from '../screens/ProposeNewIndicator/ProposeNewIndicator';
import ScorecardResultScreen from '../screens/ScorecardResult/ScorecardResult';
import ParticipantScreen from '../screens/Participant/Participant';
import ContactScreen from '../screens/Contact/Contact';
import AboutScreen from '../screens/About/About';
import SelectedImageScreen from '../screens/SelectedImage/SelectedImage';
import VideoPlayerScreen from '../screens/VideoPlayer/VideoPlayer';
import AddNewEndpointUrlScreen from '../screens/AddNewEndpointUrl/AddNewEndpointUrl';

import OfflineInstructionScreen from '../screens/OfflineInstruction/OfflineInstruction';
import FilterScorecardScreen from '../screens/FilterScorecard/FilterScorecard';

// Util and components
import Color from '../themes/color';
import { LocalizationContext } from '../components/Translations';
import SettingMenu from '../components/Home/SettingMenu';
import HeaderRightButton from '../components/HeaderRightButton';
import { FontSize, FontFamily } from '../assets/stylesheets/theme/font';
import { getDeviceStyle, mobileHeadingTitleSize } from '../utils/responsive_util';
import { pressableItemSize } from '../utils/component_util';

const Stack = createStackNavigator();

function AppNavigator() {
  const { translations, initializeAppLanguage } = useContext(LocalizationContext);

  useEffect(() => {
    initializeAppLanguage();
  });

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: Color.headerColor,
        },
        headerTitleStyle: {
          fontFamily: FontFamily.title,
          fontSize: getDeviceStyle(20, mobileHeadingTitleSize()),
          marginTop: getDeviceStyle(0, 2),
          paddingLeft: 0,
          marginLeft: -18
        },
        headerTintColor: 'white',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerLeft: () => <HeaderBackButton tintColor={Color.whiteColor} onPress={ () => navigationRef.current?.goBack() } style={{ width: pressableItemSize(), height: pressableItemSize() }}/>
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          headerTitleStyle: {marginLeft: 0, fontSize: getDeviceStyle(20, mobileHeadingTitleSize()), fontFamily: FontFamily.title},
          title: `${translations['scorecardApp']}`,
          headerRight: () => (
            <SettingMenu navigation={navigation} />
          ),
          headerLeft: null
        })}
      />
      <Stack.Screen
        name="ScorecardList"
        component={ScorecardListScreen}
        options={({navigation}) => ({
          title: translations.scorecardList,
          headerRight: () => (
            <HeaderRightButton navigation={navigation} onPress={() => navigation.navigate('FilterScorecardScreen')} icon='sliders' />
          ),
        })}
      />
      <Stack.Screen
        name="ScorecardProgress"
        component={ScorecardProgressScreen}
        options={({navigator}) => ({
          header: () => null,
        })}
      />
      <Stack.Screen
        name="IndicatorDevelopment"
        component={IndicatorDevelopmentScreen}
        options={({navigation}) => ({
          header: () => null,
        })}
      />
      <Stack.Screen
        name="VotingIndicatorList"
        component={VotingIndicatorListScreen}
        options={({navigation}) => ({
          header: ()=> null
        })}
      />
      <Stack.Screen
        name="VotingIndicatorForm"
        component={VotingIndicatorFormScreen}
        options={{
          header: () => null
        }}
      />
      <Stack.Screen
        name="ScorecardResult"
        component={ScorecardResultScreen}
        options={({navigation}) => ({
          header: ()=> null
        })}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="NewScorecard"
        component={NewScorecardScreen}
        options={{
          title: `${translations.startScorecard}`,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ScorecardDetail"
        component={ScorecardDetailScreen}
        options={({navigation}) => ({
          header: () => null,
        })}
      />
      <Stack.Screen
        name="ScorecardPreference"
        component={ScorecardPreferenceScreen}
        options={({navigation}) => ({
          header: () => null,
        })}
      />
      <Stack.Screen
        name="Facilitator"
        component={FacilitatorScreen}
        options={({navigation}) => ({
          header: () => null,
        })}
      />
      <Stack.Screen
        name="Participant"
        component={ParticipantScreen}
        options={({navigation}) => ({
          header: () => null,
        })}
      />
      <Stack.Screen
        name="ProposedIndicator"
        component={ProposedIndicatorScreen}
        options={({navigation}) => ({
          header: () => null,
        })}
      />
      <Stack.Screen
        name="ProposeNewIndicator"
        component={ProposeNewIndicatorScreen}
        options={() => ({
          header: () => null,
        })}
      />
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          title: `${translations['contact']}`,
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: `${translations['about']}`,
        }}
      />
      <Stack.Screen
        name="OfflineParticipantList"
        component={OfflineInstructionScreen}
        options={({navigation}) => ({
          header: () => null,
        })}
      />
      <Stack.Screen
        name="OfflineProposedIndicator"
        component={OfflineInstructionScreen}
        options={({navigation}) => ({
          header: () => null,
        })}
      />
      <Stack.Screen
        name="OfflineIndicatorDevelopment"
        component={OfflineInstructionScreen}
        options={({navigation}) => ({
          header: () => null,
        })}
      />
      <Stack.Screen
        name="OfflineScorecardResult"
        component={OfflineInstructionScreen}
        options={({navigation}) => ({
          header: () => null,
        })}
      />
      <Stack.Screen
        name="SelectedImage"
        component={SelectedImageScreen}
        options={({navigator}) => ({
          header: () => null,
        })}
      />
      <Stack.Screen
        name="FilterScorecardScreen"
        component={FilterScorecardScreen}
        options={({navigator}) => ({
          header: () => null,
        })}
      />
      <Stack.Screen
        name="VideoPlayer"
        component={VideoPlayerScreen}
        options={({navigator}) => ({
          header: () => null,
        })}
      />
      <Stack.Screen
        name="AddNewEndpointUrl"
        component={AddNewEndpointUrlScreen}
        options={({navigator}) => ({
          header: () => null,
        })}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}