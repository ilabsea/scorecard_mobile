import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import { Modal, Portal, Button, Provider, TextInput} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { LocalizationContext } from '../Translations';
import { getAll } from '../../actions/votingCriteriaAction';

import Color from '../../themes/color';
import realm from '../../db/schema';

const FormModal = (props) => {
  const dispatch = useDispatch();
  const { translations } = useContext(LocalizationContext);
  const { criteria, visible } = props;
  const [ content, setContent ] = useState();

  const onDimiss = () => {
    !!props.onDimiss && props.onDimiss();
  }

  useEffect(() => {
    setContent(criteria[criteria.currentFieldName]);
  }, [props]);

  const submit = () => {
    let data = { uuid: criteria.uuid };
    data[criteria.currentFieldName] = content;

    realm.write(() => {
      realm.create('VotingCriteria', data, 'modified');
    });

    dispatch(getAll(criteria.scorecard_uuid));
    onDimiss();
  }

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDimiss} contentContainerStyle={ styles.container }>
        <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>Update {criteria.currentFieldName}</Text>

        <TextInput
          mode={'outlined'}
          multiline={true}
          numberOfLines={4}
          label={translations.inputText}
          value={content}
          onChangeText={(text) => setContent(text)}
        />

        <View style={{flex: 1}}></View>
        <View style={styles.btnWrapper}>
<<<<<<< HEAD
          <Button labelStyle={{color: Color.headerColor}} onPress={onDimiss}>{translations.cancel}</Button>
          <Button mode="contained" contentStyle={{backgroundColor: Color.headerColor}} labelStyle={{color: '#fff'}} onPress={submit}>{translations.save}</Button>
=======
          <Button onPress={onDimiss}>{translations.cancel}</Button>
          <Button mode="contained" labelStyle={{color: '#fff'}} onPress={submit}>{translations.save}</Button>
>>>>>>> ScorecardResult: enhance style and add some translation
        </View>
      </Modal>
    </Portal>
  )
}

export default FormModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    height: 450,
    marginHorizontal: 30,
    justifyContent: 'flex-start'
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});
