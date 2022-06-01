import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { useDispatch } from 'react-redux';
import { getAll } from '../../actions/votingIndicatorAction';

import ScorecardResultModalTitle from './ScorecardResultModalTitle';
import ScorecardResultModalList from './ScorecardResultModalList';
import FormBottomSheetButton from '../FormBottomSheetModal/FormBottomSheetButton';

import scorecardResultHelper from '../../helpers/scorecard_result_helper';
import scorecardResultService from '../../services/scorecard_result_service';

import { swotContentHeight } from '../../constants/modal_constant';
import Color from '../../themes/color';

const ScorecardResultModalMain = (props) => {
  const dispatch = useDispatch();
  const { indicator, selectedIndicator, isScorecardFinished } = props;
  const [points, setPoints] = useState(['']);
  const [hasAction, setHasAction] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedActions, setSelectedActions] = useState([false]);

  let defaultPoints = indicator[indicator.currentFieldName] != null && !hasAction ? [...JSON.parse(indicator[indicator.currentFieldName])] : [''];
  let savedSelectedActions = indicator.suggested_action_status != undefined && indicator.suggested_action_status.length > 0 ? indicator.suggested_action_status : [];

  const onDismiss = () => {
    setHasAction(false);
    setPoints(['']);
    setSelectedActions([false]);
    dispatch(getAll(indicator.scorecard_uuid));
    !!props.onDismiss && props.onDismiss();
  }

  function closeBottomSheet() {
    setHasAction(false);
    onDismiss();
  }

  function updateVotingIndicator() {
    scorecardResultService.updateVotingIndicator(getPoints(), indicator, getSelectedActions(), () => {
      dispatch(getAll(indicator.scorecard_uuid));
    });
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

    if (scorecardResultHelper.isSuggestedAction(indicator.currentFieldName)) {
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

    if (scorecardResultHelper.isSuggestedAction(indicator.currentFieldName)) {
      savedSelectedActions = getSelectedActions();
      savedSelectedActions.splice(index, 1);
    }
    updateVotingIndicator();
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

  function toggleCheckbox(index) {
    const newSelectedActions = getSelectedActions();
    newSelectedActions[index] = !newSelectedActions[index];
    savedSelectedActions = newSelectedActions;

    setSelectedActions([...newSelectedActions]);
    updateVotingIndicator();
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{height: hp(swotContentHeight), backgroundColor: Color.whiteColor}}>
        <ScorecardResultModalTitle
          selectedIndicator={selectedIndicator}
          addNewPoint={() => addNewPoint()}
          isScorecardFinished={isScorecardFinished}
          indicator={indicator}
        />

        <ScorecardResultModalList
          hasAction={hasAction}
          points={points}
          defaultPoints={defaultPoints}
          renderSelectedActions={getSelectedActions()}
          isScorecardFinished={isScorecardFinished}
          indicator={indicator}
          isDelete={isDelete}
          toggleCheckbox={toggleCheckbox}
          onChangeText={onChangeText}
          deletePoint={deletePoint}
          updateVotingIndicator={() => updateVotingIndicator()}
        />

        { !isScorecardFinished &&
          <FormBottomSheetButton isValid={!isScorecardFinished} save={() => closeBottomSheet()} />
        }
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ScorecardResultModalMain;