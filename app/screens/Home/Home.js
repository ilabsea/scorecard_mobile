import React, {useContext, useEffect, useState} from 'react';
import { LocalizationContext } from '../../components/Translations';
import AsyncStorage from '@react-native-community/async-storage'; // 1

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";

import analytics from '@react-native-firebase/analytics';

const Home: () => React$Node = ({ navigation }) => {
  const { translations } = useContext(LocalizationContext); // 1

  useEffect(() => {

  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button onPress={() => navigation.navigate('Setting')} title='setting'/>
      <Line name="Translation example" value={translations.hello} />
    </ScrollView>
  );
};


const Line = (props) => (
  <View style={styles.block}>
    <Text style={styles.name}>{props.name}</Text>
    <Text style={styles.value}>{JSON.stringify(props.value, null, 2)}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "flex-start",
  },
  block: {
    marginBottom: 16,
    alignItems: "flex-start",
  },
  name: {
    textDecorationLine: "underline",
    fontWeight: "500",
    marginBottom: 8,
  },
  value: {
    textAlign: "left",
  },
});

export default Home;
