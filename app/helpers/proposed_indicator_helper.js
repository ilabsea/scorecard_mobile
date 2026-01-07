import React from 'react';
import VotingIndicator from '../models/VotingIndicator';
import Indicator from '../models/Indicator';
import ProposedIndicator from '../models/ProposedIndicator';
import LanguageIndicator from '../models/LanguageIndicator';
import Scorecard from '../models/Scorecard';
import { getAttributesByColumns } from './scorecard_attributes_helper';
import participantHelper from './participant_helper';
import proposedIndicatorService from '../services/proposed_indicator_service';
import { isProposeByIndicatorBase } from '../utils/proposed_indicator_util';
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
    getProposedIndicators,
    getLastProposed,
    getCardSubtitle,
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

  function showFormModal(formRef, participantModalRef, proposedIndicatorParams) {
    // proposedIndicatorParams is equal to { scorecardUuid, indicator }
    showParticipantListModal(formRef, participantModalRef, proposedIndicatorParams);
    participantModalRef.current?.present();
  }

  async function showParticipantListModal(formRef, participantModalRef, proposedIndicatorParams) {
    const { scorecardUuid, indicator } = proposedIndicatorParams;
    const isIndicatorBase = await isProposeByIndicatorBase();

    formRef.current?.setBodyContent(
      <ParticipantModalMain scorecardUuid={scorecardUuid}
        selectedIndicator={indicator}
        showAddParticipantModal={() => _showAddParticipantModal(formRef, participantModalRef, proposedIndicatorParams)}
        isIndicatorBase={isIndicatorBase}
        participantModalRef={participantModalRef}
      />
    );
  }

  function getProposedIndicators(scorecardUuid, participantUuid) {
    return !!participantUuid ? ProposedIndicator.find(scorecardUuid, participantUuid) : ProposedIndicator.getAllByScorecard(scorecardUuid);
  }

  function getLastProposed(scorecardUuid, participantUuid) {
    if (participantUuid)
      return {
        last_order_number: ProposedIndicator.getLastOrderNumberOfParticipant(scorecardUuid, participantUuid), // Last order of the proposed indicator of the participant
        previous_proposed_indicators: ProposedIndicator.find(scorecardUuid, participantUuid)  // Previous proposed indicators of the participant
      }

    return {
      last_order_number: ProposedIndicator.getLastOrderNumberOfScorecard(scorecardUuid),   // last order of the proposed indicator of the scorecard
      previous_proposed_indicators: ProposedIndicator.getAllByScorecard(scorecardUuid)   // Previous proposed indicators of the scorecard
    }
  }

  function getCardSubtitle(translations, scorecardUuid, indicatorableId) {
    const raisedParticipants = participantHelper.getRaisedParticipantByIndicator(scorecardUuid, indicatorableId);
    const translatedLabel = raisedParticipants.length > 1 ? translations.numberOfRaisedParticipants : translations.numberOfRaisedParticipant
    let label = translations.formatString(translatedLabel, raisedParticipants.length)
    if (raisedParticipants.filter(participant => participant.countable == false).length > 0)
      label += ` (${translations.anonymous} 1)`

    return label
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

  function _showAddParticipantModal(formRef, participantModalRef, proposedIndicatorParams) {
    const { scorecardUuid, indicator } = proposedIndicatorParams;
    formRef.current?.setBodyContent(
      <AddNewParticipantMain scorecardUuid={ scorecardUuid }
        title={!!indicator ? indicator.name : ''}
        onSaveParticipant={(participant) => {
          if (!!indicator) {
            proposedIndicatorService.create(scorecardUuid, indicator, participant.uuid);
            setTimeout(() => {
              showParticipantListModal(formRef, participantModalRef, proposedIndicatorParams);
            }, 50);
          }
          else {
            participantModalRef.current?.dismiss();
            navigate('ProposeNewIndicator', { scorecard_uuid: proposedIndicatorParams.scorecardUuid, participant_uuid: participant.uuid });
          }
        }}
      />
    );
  }
})();

export default proposedIndicatorHelper;
