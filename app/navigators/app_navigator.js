import React, {useContext, useEffect} from 'react';

import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage'; // 1

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
import VotingCriteriaFormScreen from '../screens/VotingCriteriaForm/VotingCriteriaForm';
import VotingCriteriaListScreen from '../screens/VotingCriteriaList/VotingCriteriaList';
import RaisingProposedScreen from '../screens/RaisingProposed/RaisingProposed';
import CreateNewIndicatorScreen from '../screens/CreateNewIndicator/CreateNewIndicator';
import ScorecardResultScreen from '../screens/ScorecardResult/ScorecardResult';
import ParticipantListScreen from '../screens/ParticipantList/ParticipantList';
import AddNewParticipantScreen from '../screens/AddNewParticipant/AddNewParticipant';
import ParticipantInformationScreen from '../screens/ParticipantInformation/ParticipantInformation';
import ContactScreen from '../screens/Contact/Contact';

// Util and components
import Color from '../themes/color';
import { LocalizationContext } from '../components/Translations';
import { FontSize, FontFamily } from '../assets/stylesheets/theme/font';

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
          fontFamily: FontFamily.title
        },
        headerTintColor: 'white',
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          title: `${translations['scorecardApp']}`,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Setting')}
              style={{marginRight: 16}}>
              <AppIcon style={{fontSize: 25}} name="settings" color="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ScorecardList"
        component={ScorecardListScreen}
        options={{
          headerTitle: `${translations['scorecardList']}`,
        }}
      />
      <Stack.Screen
        name="ScorecardProgress"
        component={ScorecardProgressScreen}
        options={({route, navigation}) => ({
          title: route.params.title,
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
        name="VotingCriteriaList"
        component={VotingCriteriaListScreen}
        options={({navigation}) => ({
          header: ()=> null
        })}
      />
      <Stack.Screen
        name="VotingCriteriaForm"
        component={VotingCriteriaFormScreen}
        options={{
          headerTitle: "Scorecard Voting",
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
          headerTitle: `${translations['setting']}`,
        }}
      />
      <Stack.Screen
        name="NewScorecard"
        component={NewScorecardScreen}
        options={{
          title: `${translations['newScorecard']}`,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ScorecardDetail"
        component={ScorecardDetailScreen}
        options={({navigation}) => ({
          header: () => null,
        })}
        // options={{
        //   title: `${translations['scorecardDetail']}`,
        //   headerTitleAlign: 'center',
        // }}
      />
      <Stack.Screen
        name="ScorecardPreference"
        component={ScorecardPreferenceScreen}
        options={({navigation}) => ({
          header: () => null,
        })}
        // options={{
        //   title: `${translations['getStarted']}`,
        // }}
      />
      <Stack.Screen
        name="Facilitator"
        component={FacilitatorScreen}
        options={({navigation}) => ({
          header: () => null,
        })}
      />
      <Stack.Screen
        name="ParticipantInformation"
        component={ParticipantInformationScreen}
        options={({navigation}) => ({
          header: () => null,
        })}
      />
      <Stack.Screen
        name="ParticipantList"
        component={ParticipantListScreen}
        options={({navigation}) => ({
          header: () => null,
        })}
      />
      <Stack.Screen
        name="AddNewParticipant"
        component={AddNewParticipantScreen}
        options={{
          title: `${translations.participantInformation}`,
        }}
      />
      <Stack.Screen
        name="RaisingProposed"
        component={RaisingProposedScreen}
        options={({navigation}) => ({
          header: () => null,
        })}
      />
      <Stack.Screen
        name="CreateNewIndicator"
        component={CreateNewIndicatorScreen}
        options={{
          title: `${translations['createNewProposedCriteria']}`,
        }}
      />
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          title: `${translations['contact']}`,
        }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
