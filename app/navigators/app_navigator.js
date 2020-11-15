import React, {useContext} from 'react';

import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppIcon from 'react-native-vector-icons/MaterialIcons';

// Screens
import HomeScreen from '../screens/Home/Home';
import SettingScreen from '../screens/Setting/Setting';
import NewScorecardScreen from '../screens/NewScorecard/NewScorecard';
import ScorecardDetailScreen from '../screens/ScorecardDetail/ScorecardDetail';
import ScorecardPreferenceScreen from '../screens/ScorecardPreference/ScorecardPreference';
import FacilitatorScreen from '../screens/Facilitator/Facilitator';
import ScorecardListScreen from '../screens/ScorecardList/ScorecardList';
import ScorecardShowScreen from '../screens/ScorecardShow/ScorecardShow';

// Util and components
import ParticipantInformationScreen from '../screens/ParticipantInformation/ParticipantInformation';
import {LocalizationProvider, LocalizationContext} from '../components/Translations';


import Color from '../themes/color';

const Stack = createStackNavigator();

function AppNavigator() {
  const { translations, appLanguage } = useContext(LocalizationContext);

  return (
    <NavigationContainer>
      <LocalizationProvider>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: Color.headerColor,
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
                  <AppIcon style={{fontSize: 25}} name="settings" />
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
            name="ScorecardShow"
            component={ScorecardShowScreen}
            options={({route, navigation}) => ({
              title: route.params.title,
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
            options={{
              title: `${translations['getStarted']}`,
            }}
          />
        </Stack.Navigator>
      </LocalizationProvider>
    </NavigationContainer>
  );
}

export default AppNavigator;
