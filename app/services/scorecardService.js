import realm from '../db/schema';

export const uploadToServer = (scorecard_uuid) => {
  const scorecard = realm.objects('Scorecard').filtered(`uuid='${scorecard_uuid}'`);

  if (!scoorecard) {
    return;
  }

  console.log('-------------uploading');
}
