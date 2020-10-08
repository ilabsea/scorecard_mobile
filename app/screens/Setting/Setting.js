import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  Button
} from 'react-native';

import RNFS from 'react-native-fs';

import {LocalizationContext} from '../../components/Translations';
import uuidv4 from '../../utils/uuidv4';
import realm from '../../db/schema';
import languageService from '../../services/language_service';

const Setting: () => React$Node = () => {
  const {
    translations,
    appLanguage,
    setAppLanguage,
    initializeAppLanguage,
  } = useContext(LocalizationContext); // 1

  // initializeAppLanguage(); // 2

  const downloadLanguage = (code) => {
    let progress = data => {};
    let begin = res => {};
    let progressDivider = 1;
    let background = false;
    let fileName = `${code}.json`;

    let options = {
      fromUrl: `http://192.168.1.116:3000/api/v1/languages/${code}/download`,
      toFile: `${RNFS.DocumentDirectoryPath}/${fileName}`,
      begin,
      progress,
      background,
      progressDivider
    };

    RNFS.downloadFile(options).promise.then(res => {
      realm.write(() => {
        realm.create('Language', {code: code, file: `${RNFS.DocumentDirectoryPath}/${fileName}`}, 'modified');
      });
    }).catch(err => {
      console.log(err);
    });
  }

  const Item = ({ title }) => {
    return (
      <View style={[styles.item, {display: 'flex', flexDirection: 'row'}]}>
        <Text onPress={() => setAppLanguage(title)} style={[styles.title, {backgroundColor: 'yellow', flex: 1}]}>
          {title}
        </Text>

        <Text onPress={() => downloadLanguage(title)} style={{backgroundColor: 'orange'}}>
          Download
        </Text>
      </View>
    )
  }

  const renderItem = ({ item }) => (
    <Item title={item} />
  )

  const buildLanguage = () => {
    let buildin_languages = ['cn', 'vn'];

    realm.write(() => {
      for(let i=0; i<buildin_languages.length; i++) {
        realm.create('Language', { code: buildin_languages[i], name: buildin_languages[i] });
      }
    });
  }

  const deleteLanguage = () => {
    realm.write(() => {
      let allLanguages = realm.objects('Language');
      realm.delete(allLanguages);
    });
  }

  const getData = () => {
    let data = translations.getAvailableLanguages();
    // let db_languages = realm.objects('Language').map(l => l.code);
    // data = data.concat(db_languages);

    return data;
  }

  getData();

  return (
    <View style={[styles.container]}>
      <Button title='Generate languages' onPress={() => buildLanguage()}/>
      <View style={{marginTop: 10}}>
        <Button title='Destroy languages' onPress={() => deleteLanguage()}/>
      </View>

      <Text h4 h4Style={styles.language}>
        { translations['hello'] }
      </Text>

      <FlatList
        data={getData()}
        renderItem={renderItem}
        keyExtractor={item => uuidv4()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  language: {
    paddingTop: 10,
    textAlign: 'center',
  },

  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Setting;
