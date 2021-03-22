import realm from '../db/schema';
import AsyncStorage from '@react-native-community/async-storage';

const Scorecard = (() => {
  return {
    getAll,
    find,
    update,
    upsert,
    destroy,
    isSubmitted,
    isExists,
    tourTipShown
  }

  function getAll() {
    return realm.objects('Scorecard').sorted('downloaded_at', true);
  }

  function find(uuid) {
    return realm.objects('Scorecard').filtered(`uuid='${uuid}'`)[0];
  }

  function update(uuid, params={}) {
    realm.write(() => {
      realm.create('Scorecard', Object.assign(params, {uuid: uuid}), 'modified');
    })
  }

  function upsert(response) {
    AsyncStorage.setItem('SELECTED_SCORECARD_UUID', response.uuid);
    realm.write(() => {
      realm.create('Scorecard', _buildData(response), 'modified');
    });
  }

  function destroy(scorecardUuid) {
    let scorecard = find(scorecardUuid);

    realm.write(() => {
      realm.delete(scorecard);
    });
  }

  function isSubmitted(scorecardUuid) {
    const scorecard = find(scorecardUuid);

    return !!scorecard && scorecard.isUploaded;
  }

  function isExists(uuid) {
    return !!find(uuid);
  }

  function tourTipShown(uuid) {
    return find(uuid).tour_tip_shown;
  }

  // Private

  function _buildData(response) {
    return ({
      uuid: response.uuid,
      unit_type: response.unit_type_name,
      facility_id: response.facility_id,
      facility: response.facility != null ? JSON.stringify(response.facility) : '',
      facility_code: response.facility.code,
      scorecard_type: response.scorecard_type,
      name: response.name,
      description: response.description,
      year: response.year,
      local_ngo_name: response.local_ngo_name,
      local_ngo_id: response.local_ngo_id,
      province: response.province,
      district: response.district,
      commune: response.commune,
      program_id: response.program_id,
      downloaded_at: new Date(),
      primary_school: response.primary_school != null ? JSON.stringify(response.primary_school) : null,
    })
  }
})();

export default Scorecard;
