import React, {useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
// import {ListItem, Text} from 'react-native-elements';
import {useSafeArea} from 'react-native-safe-area-context';
import {LocalizationContext} from '../../components/Translations';

const Setting: () => React$Node = () => {
  const insets = useSafeArea();
  const {
    translations,
    appLanguage,
    setAppLanguage,
    initializeAppLanguage,
  } = useContext(LocalizationContext); // 1

  initializeAppLanguage(); // 2

  console.log('translationsSetting', translations)
  console.log('appLanguageSetting', appLanguage)

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <Text h4 h4Style={styles.language}>
        { translations['hello'] }
      </Text>

      { translations.getAvailableLanguages().map((currentLang, i) => (
        <Text key={i} onPress={() => setAppLanguage(currentLang)}>{currentLang}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  language: {
    paddingTop: 10,
    textAlign: 'center',
  },
});

export default Setting;
