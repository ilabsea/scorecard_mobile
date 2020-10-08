import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home/Home';
import SettingScreen from '../screens/Setting/Setting';
import {LocalizationProvider} from '../components/Translations';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <LocalizationProvider>
        <Stack.Navigator initialRouteName="Setting">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Setting" component={SettingScreen} />
        </Stack.Navigator>
      </LocalizationProvider>
    </NavigationContainer>
  );
}

export default AppNavigator;
