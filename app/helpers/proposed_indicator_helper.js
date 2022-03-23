import React from 'react';
import CustomIndicator from '../models/CustomIndicator';
import VotingCriteria from '../models/VotingCriteria';
import { getAttributesByColumns } from '../helpers/scorecard_attributes_helper';
import { getLanguageIndicator } from '../services/language_indicator_service';

import ProposedIndicatorParticipantList from '../components/ProposedIndicatorByIndicatorBase/ProposedIndicatorParticipantList';
import AddNewParticipantContent from '../components/ParticipantModal/AddNewParticipantContent';

const proposedIndicatorHelper = (() => {
  return {
    getProposedIndicatorAttributes,
    getOrderedSelectedProposedIndicators,
    getDisplayName,
    showParticipantListModal,
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
    const languageIndicator = getLanguageIndicator(scorecardUuid, proposedIndicator.indicatorable_id, 'text');
    return !!languageIndicator ? languageIndicator.content : proposedIndicator.indicatorable_name;
  }

  function showParticipantListModal(formRef, participantModalRef, proposedIndicatorParams, updateIndicatorList) {
    const { scorecardUuid, indicator } = proposedIndicatorParams;

    formRef.current?.setBodyContent(
      <ProposedIndicatorParticipantList scorecardUuid={scorecardUuid}
        selectedIndicator={indicator}
        showAddParticipantModal={() => _showAddParticipantModal(formRef, participantModalRef, scorecardUuid, indicator)}
        updateIndicatorList={() => updateIndicatorList()}
      />
    );

    participantModalRef.current?.present();
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

  function _showAddParticipantModal(formRef, participantModalRef, scorecardUuid, indicator) {
    formRef.current?.setBodyContent(
      <AddNewParticipantContent scorecardUuid={ scorecardUuid }
        title={indicator.name}
        onSaveParticipant={ (participant) => participantModalRef.current?.dismiss()} />
    );
  }
})();

export default proposedIndicatorHelper;