import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';

import { Modal, Portal } from 'react-native-paper';
import { Text, Icon } from 'native-base';
import { useDispatch } from 'react-redux';
import { LocalizationContext } from '../Translations';
import { getAll } from '../../actions/votingCriteriaAction';

import CloseButton from '../CloseButton';
import SaveButton from '../SaveButton';
import OutlinedButton from '../OutlinedButton';
import ScorecardResultTextInput from './ScorecardResultTextInput';

import realm from '../../db/schema';

import { english } from '../../constants/locale_constant';
import { getDeviceStyle } from '../../utils/responsive_util';
import FormModalTabletStyles from './styles/tablet/FormModalStyle';
import FormModalMobileStyles from './styles/mobile/FormModalStyle';

const styles = getDeviceStyle(FormModalTabletStyles, FormModalMobileStyles);

const FormModal = (props) => {
  const dispatch = useDispatch();
  const { translations, appLanguage } = useContext(LocalizationContext);
  const { criteria, visible, selectedIndicator } = props;
  const [points, setPoints] = useState(['']);
  const [hasAction, setHasAction] = useState(false);

  let defaultPoints = criteria[criteria.currentFieldName] != null && !hasAction ? [...JSON.parse(criteria[criteria.currentFieldName])] : [];

  const onDismiss = () => {
    setHasAction(false);
    setPoints(['']);
    !!props.onDismiss && props.onDismiss();
  }

  function submit() {
    let data = { uuid: criteria.uuid };
    let inputtedPoints = points.filter(note => note.length > 0);

    data[criteria.currentFieldName] = inputtedPoints.length == 0 ? null : JSON.stringify(inputtedPoints);

    realm.write(() => {
      realm.create('VotingCriteria', data, 'modified');
    });

    dispatch(getAll(criteria.scorecard_uuid));
    setHasAction(false);
    onDismiss();
  }

  function getPoints() {
    return points[0] == '' ? defaultPoints : points;
  }

  function addNewPoint() {
    let newPoints = getPoints();
    newPoints.push('');
    defaultPoints = [...defaultPoints ,...newPoints];

    setPoints([...newPoints]);
    setHasAction(true);
  }

  function deletePoint(index) {
    let newPoints = getPoints();
    newPoints.splice(index, 1);
    defaultPoints = newPoints;

    setPoints([...newPoints]);
    setHasAction(true);
  }

  function onChangeText(fieldName, value) {
    let index = fieldName.split('-')[1];
    let newPoints = getPoints();
    newPoints[index] = value;

    setPoints([...newPoints]);
  }

  function _renderForm() {
    let renderPoints = defaultPoints.length > 0 && points[0] == '' ? defaultPoints : points;

    return renderPoints.map((note, index) => {
      let fieldName = `note-${index}`;
      return (
        <View key={index} style={{flexDirection: 'row', flex: 1, width: '100%', alignItems: 'center', marginTop: 5}}>
          <Text style={styles.orderNumberText}>{ index + 1 }.</Text>
          <View style={{flex: 1}}>
            <ScorecardResultTextInput
              autoFocus={true}
              value={note}
              placeholder={translations[criteria.currentFieldName]}
              fieldName={fieldName}
              onChangeText={onChangeText}
              customStyle={styles.inputText}/>
          </View>

          <TouchableOpacity
            onPress={() => deletePoint(index)}
            style={styles.btnRemove}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
            <Icon name='trash' type="FontAwesome" style={styles.removeIcon} />
          </TouchableOpacity>
        </View>
      )
    });
  }

  function _renderIndicatorName() {
    if (selectedIndicator)
      return selectedIndicator.content ? selectedIndicator.content : selectedIndicator.name;

    return '';
  }

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={ styles.container }>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={styles.headerContainer}>
              <View style={styles.titleContainer}>
                <Text numberOfLines={1} style={styles.titleText}>
                  { _renderIndicatorName() }
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.subTitleText}>{translations.insert}</Text>
                  <Text style={[styles.subTitleText, {textTransform: 'lowercase'}, appLanguage == english ? { marginLeft: 4 } : {}]}>
                    {translations[criteria.currentFieldName]}
                  </Text>
                </View>
              </View>

              <OutlinedButton
                icon='plus'
                label={ translations.addNew }
                onPress={() => addNewPoint() }
              />
            </View>

            <ScrollView
              contentContainerStyle={{paddingTop: 0, paddingBottom: 20}}
              showsVerticalScrollIndicator={false}
            >
              { _renderForm() }
            </ScrollView>

            <View style={styles.btnWrapper}>
              <CloseButton onPress={() => onDismiss()} label={translations.close} />
              <SaveButton onPress={() => submit()} label={translations.save} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Portal>
  )
}

export default FormModal;