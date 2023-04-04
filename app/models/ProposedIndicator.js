import realm from '../db/schema';
import Participant from './Participant';

const MODEL = 'ProposedIndicator';

const ProposedIndicator = (() => {
  return {
    find,
    create,
    update,
    getAllByScorecard,
    findByParticipant,
    findByIndicator,
    getAllDistinctTag,
    getAllDistinct,
    destroy,
    getLastOrderNumberOfParticipant,
    getLastOrderNumberOfIndicator,
    getLastOrderNumberOfScorecard,
    destroyUnconfirmProposedIndicators,
    getUnconfirmedProposedIndicators,
    hasAnonymousProposed,
    getNumberAnonymousProposeByIndicator,
    deleteByParticipant,
  };

  function find(scorecardUuid, participantUuid) {
    return realm.objects(MODEL).filtered('scorecard_uuid = "'+ scorecardUuid +'" AND participant_uuid = "'+ participantUuid +'" SORT(indicatorable_name ASC)');
  }

  function create(data) {
    realm.write(() => {
      realm.create(MODEL, data, 'modified');
    });
  }

  function update(uuid, params) {
    if (realm.objects(MODEL).filtered(`uuid = '${uuid}'`)) {
      realm.write(() => {
        realm.create(MODEL, Object.assign(params, {uuid: uuid}), 'modified');
      })
    }
  }

  function getAllByScorecard(scorecardUuid) {
    return realm.objects(MODEL).filtered(`scorecard_uuid='${scorecardUuid}'`);
  }

  function findByParticipant(scorecardUuid, indicatorId, participantUuid) {
    const indicatorQuery = !!indicatorId ? `AND indicatorable_id = '${ indicatorId }'` : '';
    const query = `scorecard_uuid = '${ scorecardUuid }' ${ indicatorQuery } AND participant_uuid = '${ participantUuid }'`;
    return realm.objects(MODEL).filtered(query)[0];
  }

  function findByIndicator(scorecardUuid, indicatorableId) {
    return realm.objects(MODEL).filtered(`scorecard_uuid = '${scorecardUuid}' AND indicatorable_id = '${indicatorableId}'`);
  }

  function getAllDistinctTag(scorecardUuid) {
    return realm.objects(MODEL).filtered(`scorecard_uuid='${scorecardUuid}' DISTINCT(tag)`);
  }

  function getAllDistinct(scorecardUuid) {
    return realm.objects(MODEL).filtered(`scorecard_uuid='${scorecardUuid}' DISTINCT(indicatorable_id, indicatorable_type) SORT(indicatorable_name ASC)`);
  }

  function destroy(proposedIndicator) {
    realm.write(() => {
      realm.delete(proposedIndicator);
    });
  }

  function getLastOrderNumberOfParticipant(scorecardUuid, participantUuid) {
    const orderNumber = realm.objects(MODEL).filtered(`scorecard_uuid = '${ scorecardUuid }' AND participant_uuid = '${ participantUuid }'`).max('order');
    return !orderNumber ? 0 : orderNumber;
  }

  function getLastOrderNumberOfIndicator(scorecardUuid, indicatorId) {
    const orderNumber = realm.objects(MODEL).filtered(`scorecard_uuid = '${ scorecardUuid }' AND indicatorable_id = '${ indicatorId }'`).max('order');
    return !orderNumber ? 0 : orderNumber;
  }

  function getLastOrderNumberOfScorecard(scorecardUuid) {
    const orderNumber = realm.objects(MODEL).filtered(`scorecard_uuid = '${ scorecardUuid }'`).max('order');
    return !orderNumber ? 0 : orderNumber;
  }

  function destroyUnconfirmProposedIndicators(scorecardUuid, participantUuid, lastOrderNumber) {
    const unconfirmedProposedIndicators = getUnconfirmedProposedIndicators(scorecardUuid, participantUuid, lastOrderNumber);

    if (unconfirmedProposedIndicators.length > 0) {
      realm.write(() => {
        realm.delete(unconfirmedProposedIndicators);
      });
    }
  }

  function getUnconfirmedProposedIndicators(scorecardUuid, participantUuid, lastOrderNumber) {
    const participantQuery = !!participantUuid ? `AND participant_uuid = '${ participantUuid }'` : '';
    const query = `scorecard_uuid = '${ scorecardUuid }' ${ participantQuery } AND order > ${ lastOrderNumber }`;

    return realm.objects(MODEL).filtered(query);
  }

  function hasAnonymousProposed(scorecardUuid, indicatorableId) {
    const anonymousParticpant = Participant.getAnonymousByScorecard(scorecardUuid)[0];
    const anonymousUuid = !!anonymousParticpant ? anonymousParticpant.uuid : '';
    return realm.objects(MODEL).filtered(`scorecard_uuid = '${scorecardUuid}' AND indicatorable_id = '${indicatorableId}' AND participant_uuid = '${anonymousUuid}'`).length > 0;
  }

  function getNumberAnonymousProposeByIndicator(scorecardUuid, indicatorableId) {
    const proposedIndicators = findByIndicator(scorecardUuid, indicatorableId);
    let anonymousCount = 0;
    proposedIndicators.map(proposedIndicator => {
      Participant.isAnonymous(proposedIndicator.participant_uuid) && anonymousCount++;
    });
    return anonymousCount;
  }

  function deleteByParticipant(scorecardUuid, participantUuid) {
    const proposedIndicators = realm.objects(MODEL).filtered(`scorecard_uuid = '${ scorecardUuid }' AND participant_uuid = '${ participantUuid }'`);

    if (proposedIndicators.length > 0){
      destroy(proposedIndicators);
      Participant.update(participantUuid, { raised: false })
    }
  }
})();

export default ProposedIndicator;
