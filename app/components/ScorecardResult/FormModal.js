import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { Modal, Portal} from 'react-native-paper';
import { Button, Text } from 'native-base';
import { useDispatch } from 'react-redux';
import { LocalizationContext } from '../Translations';
import { getAll } from '../../actions/votingCriteriaAction';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { FontSize, FontFamily } from '../../assets/stylesheets/theme/font';

import CloseButton from '../CloseButton';
import SaveButton from '../SaveButton';

import Color from '../../themes/color';
import realm from '../../db/schema';

const FormModal = (props) => {
  const dispatch = useDispatch();
  const { translations } = useContext(LocalizationContext);
  const { criteria, visible } = props;
  const richText = React.createRef();

  const onDismiss = () => {
    !!props.onDismiss && props.onDismiss();
  }

  async function submit() {
    let html = await richText.current?.getContentHtml();
    let data = { uuid: criteria.uuid };
    data[criteria.currentFieldName] = html;

    realm.write(() => {
      realm.create('VotingCriteria', data, 'modified');
    });

    dispatch(getAll(criteria.scorecard_uuid));
    onDismiss();
  }

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={ styles.container }>
        <Text style={{fontSize: 24, fontFamily: FontFamily.title, marginBottom: 20}}>{translations.insert}{translations[criteria.currentFieldName]}</Text>

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
          <CloseButton onPress={() => onDismiss()} label={translations.close} />
          <SaveButton onPress={() => submit()} label={translations.save} />
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
