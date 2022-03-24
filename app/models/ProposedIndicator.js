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
    getLastOrderNumberOfIndicator,
    getLastOrderNumberOfScorecard,
    destroyUnconfirmProposedIndicators,
    getUnconfirmedProposedIndicators,
  };

  function find(scorecardUuid, participantUuid) {
    return realm.objects(MODEL).filtered('scorecard_uuid = "'+ scorecardUuid +'" AND participant_uuid = "'+ participantUuid +'" SORT(indicatorable_name ASC)');
  }

  function create(data, excludeWriteTransaction) {
    if (excludeWriteTransaction)
      realm.create(MODEL, data, 'modified');
    else {
      realm.write(() => {
        realm.create(MODEL, data, 'modified');
      });
    }
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

  function getLastOrderNumber(scorecardUuid) {
    const orderNumber = realm.objects(MODEL).filtered(`scorecard_uuid = '${scorecardUuid}'`).max('order');
    return !orderNumber ? 0 : orderNumber;
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
    const proposedIndicators = !!participantUuid ? find(scorecardUuid, participantUuid) : getAllByScorecard(scorecardUuid);

    if (proposedIndicators.length > 0)
      destroy(getUnconfirmedProposedIndicators(scorecardUuid, participantUuid, lastOrderNumber));
  }

  function getUnconfirmedProposedIndicators(scorecardUuid, participantUuid, lastOrderNumber) {
    const participantQuery = !!participantUuid ? `AND participant_uuid = '${ participantUuid }'` : '';
    const query = `scorecard_uuid = '${ scorecardUuid }' ${ participantQuery } AND order > ${ lastOrderNumber }`;

    return realm.objects(MODEL).filtered(query);
  }
})();

export default ProposedIndicator;
