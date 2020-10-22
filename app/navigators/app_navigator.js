import React, {useContext} from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home/Home';
import SettingScreen from '../screens/Setting/Setting';
import NewScorecardScreen from '../screens/NewScorecard/NewScorecard';
import {LocalizationProvider, LocalizationContext} from '../components/Translations';
import AppIcon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();

function AppNavigator() {
  const { translations, appLanguage } = useContext(LocalizationContext);

  return (
    <NavigationContainer>
      <LocalizationProvider>
        <Stack.Navigator initialRouteName="Home">
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
            name="Setting"
            component={SettingScreen}
            options={{
              title: `${translations['setting']}`,
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
        </Stack.Navigator>
      </LocalizationProvider>
    </NavigationContainer>
  );
}

export default AppNavigator;
