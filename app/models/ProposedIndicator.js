import realm from '../db/schema';

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
    getLastOrderNumber,
    getLastOrderNumberOfParticipant,
    destroyUnconfirmProposedIndicators,
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
    return realm.objects(MODEL).filtered(`scorecard_uuid = '${ scorecardUuid }' AND indicatorable_id = '${ indicatorId }' AND participant_uuid = '${ participantUuid }'`)[0];
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

  function getLastOrderNumber(scorecardUuid) {
    const orderNumber = realm.objects(MODEL).filtered(`scorecard_uuid = '${scorecardUuid}'`).max('order');
    return !orderNumber ? 0 : orderNumber;
  }

  function getLastOrderNumberOfParticipant(scorecardUuid, participantUuid) {
    const orderNumber = realm.objects(MODEL).filtered(`scorecard_uuid = '${ scorecardUuid }' AND participant_uuid = '${ participantUuid }'`).max('order');
    return !orderNumber ? 0 : orderNumber;
  }

  function destroyUnconfirmProposedIndicators(scorecardUuid, participantUuid, lastOrderNumber) {
    const proposedIndicators = find(scorecardUuid, participantUuid);

    if (proposedIndicators.length > 0) {
      const unconfirmProposedIndicators = realm.objects(MODEL).filtered(`scorecard_uuid = '${ scorecardUuid }' AND participant_uuid = '${ participantUuid }' AND order > ${ lastOrderNumber }`);
      destroy(unconfirmProposedIndicators);
    }
  }
})();

export default ProposedIndicator;