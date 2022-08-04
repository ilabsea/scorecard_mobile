import React from 'react';
import VotingIndicator from '../models/VotingIndicator';
import Indicator from '../models/Indicator';
import ProposedIndicator from '../models/ProposedIndicator';
import LanguageIndicator from '../models/LanguageIndicator';
import Scorecard from '../models/Scorecard';
import { getAttributesByColumns } from './scorecard_attributes_helper';
import proposedIndicatorService from '../services/proposed_indicator_service';
import { isProposeByIndicatorBase } from '../utils/proposed_indicator_util';
import arrayUtil from '../utils/array_util';

import { navigate } from '../navigators/app_navigator';

import ParticipantModalMain from '../components/ParticipantModal/ParticipantModalMain';
import AddNewParticipantMain from '../components/ParticipantModal/AddNewParticipantMain';

const proposedIndicatorHelper = (() => {
  return {
    getProposedIndicatorAttributes,
    getOrderedSelectedProposedIndicators,
    getDisplayName,
    showFormModal,
    showParticipantListModal,
    getNumberOfRaisedParticipant,
    isIndicatorProposed,
    getProposedIndicators,
    getRaisedParticipantSummary,
  };

  function getProposedIndicatorAttributes(scorecard, proposedIndicators, columns, isRaisedIndicatorAttrs) {
    return proposedIndicators.map(proposedIndicator => {
      let indicatorAttrs = _getIndicatorAttrs(proposedIndicator);
      let attr = getAttributesByColumns(proposedIndicator, columns);

      attr.indicatorable_type = indicatorAttrs.type;
      attr.indicatorable_id = indicatorAttrs.indicatorable_id;
      attr.indicator_uuid = indicatorAttrs.indicator_uuid;

      if (!!isRaisedIndicatorAttrs) {
        const votingIndicator = VotingIndicator.find(scorecard.uuid, proposedIndicator.indicatorable_id);
        attr.tag_attributes = { name: proposedIndicator.tag }
        attr.selected = !!votingIndicator ? true : false;
        attr.voting_indicator_uuid = !!votingIndicator ? votingIndicator.uuid : null;
      }
      else 
        attr.uuid = proposedIndicator.uuid;    // the uuid of the votingIndicator

      return attr;
    })
  }

  function getOrderedSelectedProposedIndicators(selectedIndicators, orderedIndicatorableIds) {
    let orderedIndicators = [];

    for (let i = 0; i < orderedIndicatorableIds.length; i++) {
      const filteredIndicators = selectedIndicators.filter(indicator => indicator.indicatorable_id == orderedIndicatorableIds[i]);

      if (filteredIndicators.length == 0)
        continue;

      orderedIndicators.push(filteredIndicators[0]);
    }

    return orderedIndicators;
  }

  function getDisplayName(proposedIndicator, scorecardUuid) {
    const scorecard = Scorecard.find(scorecardUuid);
    const { indicatorable_id, indicatorable_type } = proposedIndicator;
    const languageIndicator = LanguageIndicator.findByIndicatorAndLanguageCode(indicatorable_id, indicatorable_type, scorecard.text_language_code);
    return !!languageIndicator ? languageIndicator.content : proposedIndicator.indicatorable_name;
  }

  function showFormModal(formRef, participantModalRef, proposedIndicatorParams, updateIndicatorList) {
    // proposedIndicatorParams is equal to { scorecardUuid, indicator }
    showParticipantListModal(formRef, participantModalRef, proposedIndicatorParams, updateIndicatorList);
    participantModalRef.current?.present();
  }

  async function showParticipantListModal(formRef, participantModalRef, proposedIndicatorParams, updateIndicatorList) {
    const { scorecardUuid, indicator } = proposedIndicatorParams;
    const isIndicatorBase = await isProposeByIndicatorBase();

    formRef.current?.setBodyContent(
      <ParticipantModalMain scorecardUuid={scorecardUuid}
        selectedIndicator={indicator}
        showAddParticipantModal={() => _showAddParticipantModal(formRef, participantModalRef, proposedIndicatorParams, updateIndicatorList)}
        updateIndicatorList={() => updateIndicatorList()}
        isIndicatorBase={isIndicatorBase}
        participantModalRef={participantModalRef}
      />
    );
  }

  function getNumberOfRaisedParticipant(scorecardUuid, indicatorId, participantUuid) {
    if (!!participantUuid)
      return !!ProposedIndicator.findByParticipant(scorecardUuid, indicatorId, participantUuid) ? 1 : 0;

    return ProposedIndicator.findByIndicator(scorecardUuid, indicatorId).length;
  }

  function isIndicatorProposed(scorecardUuid, indicatorId, participantUuid) {
    return getNumberOfRaisedParticipant(scorecardUuid, indicatorId, participantUuid) > 0;
  }

  function getProposedIndicators(scorecardUuid, participantUuid) {
    return !!participantUuid ? ProposedIndicator.find(scorecardUuid, participantUuid) : ProposedIndicator.getAllByScorecard(scorecardUuid);
  }

  function getRaisedParticipantSummary(scorecardUuid, indicatorableId) {
    const participants = ProposedIndicator.getRaisedParticipants(scorecardUuid, indicatorableId);
    const female = arrayUtil.getTotalOf(participants, 'gender', 'female');
    const disability = arrayUtil.getTotalOf(participants, 'disability', true);
    const minority = arrayUtil.getTotalOf(participants, 'minority', true);
    const poor = arrayUtil.getTotalOf(participants, 'poor', true);
    const youth = arrayUtil.getTotalOf(participants, 'youth', true);
    return { female, disability, minority, poor, youth };
  }

  // private methods

  function _getIndicatorAttrs(proposedIndicator) {
    const indicator = Indicator.find(proposedIndicator.indicatorable_id, proposedIndicator.indicatorable_type);
  
    const indicatorAttrs = {
      'custom': { type: 'Indicators::CustomIndicator', indicator_uuid: proposedIndicator.indicatorable_id },
      'predefined': { type: 'Indicator', indicator_uuid: indicator.indicator_uuid }
    }
    indicatorAttrs[indicator.type]['indicatorable_id'] = indicator.id;

    return indicatorAttrs[indicator.type];
  }

  function _showAddParticipantModal(formRef, participantModalRef, proposedIndicatorParams, updateIndicatorList) {
    const { scorecardUuid, indicator } = proposedIndicatorParams;

    formRef.current?.setBodyContent(
      <AddNewParticipantMain scorecardUuid={ scorecardUuid }
        title={!!indicator ? indicator.name : ''}
        onSaveParticipant={(participant) => {
          if (!!indicator) {
            proposedIndicatorService.create(scorecardUuid, indicator, participant.uuid);
            setTimeout(() => {
              updateIndicatorList();
              showParticipantListModal(formRef, participantModalRef, proposedIndicatorParams, updateIndicatorList);
            }, 50);
          }
          else {
            participantModalRef.current?.dismiss();
            navigate('CreateNewIndicator', { scorecard_uuid: proposedIndicatorParams.scorecardUuid, participant_uuid: participant.uuid });
          }
        }}
      />
    );
  }
})();

export default proposedIndicatorHelper;
