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

  realm.write(() => {
    if (!isUpdate) {
      let savedParticipant = realm.create('Participant', attrs);
      callback(participants, savedParticipant);
    }
    else {
      realm.create('Participant', attrs, 'modified');
      callback(participants, null);
    }
  });
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
