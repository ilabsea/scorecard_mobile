import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import { Modal, Portal, Button, Provider} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { LocalizationContext } from '../Translations';
import { getAll } from '../../actions/votingCriteriaAction';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';

import Color from '../../themes/color';
import realm from '../../db/schema';

const FormModal = (props) => {
  const dispatch = useDispatch();
  const { translations } = useContext(LocalizationContext);
  const { criteria, visible } = props;
  const richText = React.createRef();

  const onDimiss = () => {
    !!props.onDimiss && props.onDimiss();
  }

  async function submit() {
    let html = await richText.current?.getContentHtml();
    let data = { uuid: criteria.uuid };
    data[criteria.currentFieldName] = html;

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

        <RichEditor
          ref={richText}
          initialContentHTML={criteria[criteria.currentFieldName]}
          editorInitializedCallback={() => {}}
          style={[styles.rich]}
        />

        <RichToolbar
          style={[styles.richBar]}
          editor={richText}
          selectedIconTint={Color.headerColor}
          iconTint={'#000'}
          iconSize={60}
          actions={[
            actions.insertBulletsList,
            actions.insertOrderedList
          ]}
        />

        <View style={{flex: 1}}></View>
        <View style={styles.btnWrapper}>
          <Button labelStyle={{color: Color.headerColor}} onPress={onDimiss}>{translations.cancel}</Button>
          <Button mode="contained" contentStyle={{backgroundColor: Color.headerColor}} labelStyle={{color: '#fff'}} onPress={submit}>{translations.save}</Button>
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
    minHeight: 450,
    marginHorizontal: 30,
    justifyContent: 'flex-start'
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  rich: {
    minHeight: 200,
    flex: 1,
    borderWidth: 1,
    borderColor: Color.borderColor,
  },
  richBar: {
    height: 50,
    backgroundColor: '#e6e7e9',
    borderWidth: 1,
    borderColor: Color.borderColor,
    borderTopWidth: 0
  },
});
