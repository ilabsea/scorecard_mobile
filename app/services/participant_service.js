import realm from '../db/schema';

const getRaisedParticipants = (scorecardUuid) => {
  return realm.objects('Participant').filtered(`scorecard_uuid == '${scorecardUuid}' AND raised=true`).sorted('order', false);
}

const getParticipantInfo = (scorecardUuid, participantUuid) => {
  return realm.objects('Participant').filtered('scorecard_uuid = "'+ scorecardUuid +'" AND uuid ="'+ participantUuid +'"')[0];
}

const saveParticipantInfo = (participant, scorecardUuid, isUpdate, callback) => {
  let participants = realm.objects('Participant').filtered('scorecard_uuid = "'+ scorecardUuid +'"').sorted('order', false);
  let attrs = participant;
  if (!isUpdate)
    attrs.order = participants.length;

  let savedParticipant = null;

  realm.write(() => {
    if (!isUpdate)
      savedParticipant = realm.create('Participant', attrs);
    else
      realm.create('Participant', attrs, 'modified');
  });

  callback(participants, savedParticipant);
}

const getUnvoted = (scorecardUuid) => {
  return realm.objects('Participant').filtered(`scorecard_uuid='${scorecardUuid}' AND voted=false SORT(order ASC)`);
}

export {
  getRaisedParticipants,
  getParticipantInfo,
  saveParticipantInfo,
  getUnvoted,
};
