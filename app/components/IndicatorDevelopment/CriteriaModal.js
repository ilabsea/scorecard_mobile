import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import { Modal, Portal, Button } from 'react-native-paper';
import { LocalizationContext } from '../Translations';
import { useDispatch, useSelector } from 'react-redux';
import { setModalVisible } from '../../actions/criteriaModalAction';
import { FontSize, FontFamily } from '../../assets/stylesheets/theme/font';
import realm from '../../db/schema';

const CriteriaModal = (props) => {
  const { translations } = useContext(LocalizationContext);
  const criteriaModal = useSelector(state => state.criteriaModal);
  const dispatch = useDispatch();
  const [ currentCriteria, setCurrentCriteria ] = useState({});

  const onDimiss = () => {
    dispatch(setModalVisible(false));
  }

  useEffect(() => {
    // @Todo: update criteria query from realm
    // let criteria = realm()
    let criteria = { name: 'Custom Criteria Not', audio: '' };
    setCurrentCriteria(criteria);
  }, [props]);

  return (
    <Portal>
      <Modal visible={criteriaModal.visible} onDismiss={onDimiss} contentContainerStyle={ styles.container }>
        <Text style={styles.header}>{criteriaModal.criteria.tag}</Text>

        <Text>Issue Note</Text>

        <View style={{borderRadius: 15, overflow: 'hidden', marginTop: 16}}>
          <View style={{backgroundColor: '#f2f3f5', minHeight: 80, justifyContent: 'center', paddingHorizontal: 16}}>
            <Text style={{fontSize: 22}}>{ currentCriteria.name }</Text>
          </View>

          <View style={{backgroundColor: '#e6e7e9', height: 60, justifyContent: 'center', paddingHorizontal: 16}}>
            <Text>Play audio</Text>
          </View>
        </View>

          <View style={{flex: 1}}></View>

        <View style={styles.btnWrapper}>
          <Button mode="contained" labelStyle={{color: '#fff'}} onPress={onDimiss}>{translations.close}</Button>
        </View>

      </Modal>
    </Portal>
  )
}

export default CriteriaModal;

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
  },
  header: {
    fontSize: 24,
    fontFamily: FontFamily.title,
    marginBottom: 20,
    textTransform: 'capitalize'
  }
});
