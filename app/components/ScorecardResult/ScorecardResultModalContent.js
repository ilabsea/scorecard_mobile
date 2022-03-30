import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { useDispatch } from 'react-redux';
import { getAll } from '../../actions/votingCriteriaAction';

import ScorecardResultModalTitle from './ScorecardResultModalTitle';
import ScorecardResultModalList from './ScorecardResultModalList';
import FormBottomSheetButton from '../FormBottomSheetModal/FormBottomSheetButton';

import VotingCriteria from '../../models/VotingCriteria';
import scorecardResultHelper from '../../helpers/scorecard_result_helper';

import { swotContentHeight } from '../../constants/modal_constant';
import Color from '../../themes/color';

const ScorecardResultModalContent = (props) => {
  const dispatch = useDispatch();
  const { criteria, selectedIndicator, isScorecardFinished } = props;
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

  function isSuggestedAction() {
    return criteria.currentFieldName == 'suggested_action';
  }

  function toggleCheckbox(index) {
    const newSelectedActions = getSelectedActions();
    newSelectedActions[index] = !newSelectedActions[index];
    savedSelectedActions = newSelectedActions;

    setSelectedActions([...newSelectedActions]);
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{height: hp(swotContentHeight), backgroundColor: Color.whiteColor}}>
        <ScorecardResultModalTitle
          selectedIndicator={selectedIndicator}
          addNewPoint={() => addNewPoint()}
          isScorecardFinished={isScorecardFinished}
          criteria={criteria}
        />

        <ScorecardResultModalList
          hasAction={hasAction}
          points={points}
          defaultPoints={defaultPoints}
          renderSelectedActions={getSelectedActions()}
          isScorecardFinished={isScorecardFinished}
          criteria={criteria}
          isDelete={isDelete}
          toggleCheckbox={toggleCheckbox}
          onChangeText={onChangeText}
          deletePoint={deletePoint}
        />

        { !isScorecardFinished &&
          <FormBottomSheetButton isValid={!isScorecardFinished} save={() => submit()} />
        }
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ScorecardResultModalContent;