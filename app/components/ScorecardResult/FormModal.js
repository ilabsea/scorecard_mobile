import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';

import { Modal, Portal } from 'react-native-paper';
import { Text, Icon, CheckBox } from 'native-base';
import { useDispatch } from 'react-redux';
import { LocalizationContext } from '../Translations';
import { getAll } from '../../actions/votingCriteriaAction';

import CloseButton from '../CloseButton';
import SaveButton from '../SaveButton';
import OutlinedButton from '../OutlinedButton';
import ScorecardResultTextInput from './ScorecardResultTextInput';

import VotingCriteria from '../../models/VotingCriteria';
import scorecardResultHelper from '../../helpers/scorecard_result_helper';

import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import FormModalTabletStyles from '../../styles/tablet/FormModalComponentStyle';
import FormModalMobileStyles from '../../styles/mobile/FormModalComponentStyle';

const styles = getDeviceStyle(FormModalTabletStyles, FormModalMobileStyles);

const FormModal = (props) => {
  const dispatch = useDispatch();
  const { translations } = useContext(LocalizationContext);
  const { criteria, visible, selectedIndicator, isScorecardFinished } = props;
  const [points, setPoints] = useState(['']);
  const [hasAction, setHasAction] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedActions, setSelectedActions] = useState([false]);

  let defaultPoints = criteria[criteria.currentFieldName] != null && !hasAction ? [...JSON.parse(criteria[criteria.currentFieldName])] : [''];
  let savedSelectedActions = criteria.suggested_action_status != undefined && criteria.suggested_action_status.length > 0 ? criteria.suggested_action_status : [];

  const onDismiss = () => {
    setHasAction(false);
    setPoints(['']);
    setSelectedActions([false]);
    dispatch(getAll(criteria.scorecard_uuid));
    !!props.onDismiss && props.onDismiss();
  }

  function submit() {
    let data = { uuid: criteria.uuid };
    let inputtedPoints = getPoints();
    inputtedPoints = inputtedPoints.filter(note => note.length > 0);

    data[criteria.currentFieldName] = inputtedPoints.length == 0 ? null : JSON.stringify(inputtedPoints);

    if (isSuggestedAction())
      data['suggested_action_status'] = scorecardResultHelper.getValidSuggestedStatuses(getPoints(), getSelectedActions());

    VotingCriteria.upsert(data);

    dispatch(getAll(criteria.scorecard_uuid));
    setHasAction(false);
    onDismiss();
  }

  function getPoints() {
    return defaultPoints[0] == '' ? points : defaultPoints;
  }

  function getSelectedActions() {
    return savedSelectedActions.length > 0 ? savedSelectedActions : selectedActions;
  }

  function addNewPoint() {
    let newPoints = getPoints();
    newPoints.push('');
    defaultPoints = [...defaultPoints, ...newPoints];

    setPoints([...newPoints]);
    setHasAction(true);
    setIsDelete(false);

    if (isSuggestedAction()) {
      savedSelectedActions = getSelectedActions()
      savedSelectedActions.push(false);
    }
  }

  function deletePoint(index) {
    if (isScorecardFinished)
      return;

    let newPoints = getPoints();
    newPoints.splice(index, 1);
    defaultPoints = newPoints;

    setPoints([...newPoints]);
    setHasAction(true);
    setIsDelete(true);

    if (isSuggestedAction()) {
      savedSelectedActions = getSelectedActions();
      savedSelectedActions.splice(index, 1);
    }
  }

  function onChangeText(fieldName, value) {
    let index = fieldName.split('-')[1];
    let newPoints = getPoints();
    newPoints[index] = value;

    setHasAction(true);
    setIsDelete(false);
    defaultPoints = newPoints;

    setPoints([...newPoints]);
  }

  function _renderForm() {
    let renderPoints = hasAction ? points : defaultPoints;
    let renderSelectedActions = getSelectedActions();

    return renderPoints.map((note, index) => {
      let fieldName = `note-${index}`;
      return (
        <View key={index} style={[{flexDirection: 'row', flex: 1, width: '100%', alignItems: 'center', marginTop: 5}, isScorecardFinished ? {height: 40} : {}]}>

          { isSuggestedAction() &&
            <CheckBox
              checked={renderSelectedActions[index]}
              onPress={() => toggleCheckbox(index)}
              color={Color.clickableColor}
              style={{marginLeft: -10, marginRight: 15, alignItems: 'center', justifyContent: 'center', width: 23, height: 23, paddingTop: 2}}
            />
          }

          <Text style={[styles.orderNumberText, isSuggestedAction() ? {marginLeft: 5} : {}]}>{ index + 1 }.</Text>
          <View style={{flex: 1}}>
            <ScorecardResultTextInput
              autoFocus={true}
              value={note}
              placeholder={translations[criteria.currentFieldName]}
              fieldName={fieldName}
              onChangeText={onChangeText}
              customStyle={styles.inputText}
              disabled={isScorecardFinished}
              isDelete={isDelete}
            />
          </View>

          <TouchableOpacity
            onPress={() => deletePoint(index)}
            style={styles.btnRemove}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
            <Icon name='trash' type="FontAwesome" style={[styles.removeIcon, _getLabelMarginTop(), { color: isScorecardFinished ? Color.lightGrayColor : 'red' }]} />
          </TouchableOpacity>
        </View>
      )
    });
  }

  function _getLabelMarginTop() {
    return { marginTop: isScorecardFinished ? -2 : 0 };
  }

  function _renderIndicatorName() {
    if (selectedIndicator)
      return selectedIndicator.content ? selectedIndicator.content : selectedIndicator.name;

    return '';
  }

  function isSuggestedAction() {
    return criteria.currentFieldName == 'suggested_action';
  }

  function toggleCheckbox(index) {
    const newSelectedActions = getSelectedActions();
    newSelectedActions[index] = !newSelectedActions[index];
    savedSelectedActions = newSelectedActions;

    setSelectedActions([...newSelectedActions]);
  }

  let fieldName = translations[criteria.currentFieldName] ? translations[criteria.currentFieldName].toLowerCase() : '';
  const subTitle = `${translations.insert} ${fieldName}`;

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={ styles.container }>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{flex: 1, backgroundColor: Color.whiteColor}}>
            <View style={styles.headerContainer}>
              <View style={styles.titleContainer}>
                <Text numberOfLines={1} style={styles.titleText}>
                  { _renderIndicatorName() }
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.subTitleText}>{ subTitle }</Text>
                </View>
              </View>

              { !isScorecardFinished &&
                <OutlinedButton
                  icon='plus'
                  label={ translations.addNew }
                  onPress={() => addNewPoint() }
                  disabled={isScorecardFinished}
                />
              }
            </View>

            <ScrollView
              contentContainerStyle={{paddingTop: 0, paddingBottom: 20}}
              showsVerticalScrollIndicator={false}
            >
              { _renderForm() }
            </ScrollView>

            <View style={styles.btnWrapper}>
              <CloseButton onPress={() => onDismiss()} label={translations.close} />
              <SaveButton onPress={() => submit()} label={translations.save} disabled={isScorecardFinished} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Portal>
  )
}

export default FormModal;