import Moment from 'moment';
import settingHelper from '../helpers/setting_helper';
import { apiDateFormat } from '../constants/date_format_constant';

const scorecardDataUtil = (() => {
  return {
    getBuildData,
  }

  async function getBuildData(response) {
    return ({
      uuid: response.uuid,
      unit_type: _getStringValue(response.unit_type_name),
      facility_id: response.facility_id,
      facility: response.facility != null ? JSON.stringify(response.facility) : '',
      facility_code: _getStringValue(response.facility.code),
      scorecard_type: _getStringValue(response.scorecard_type),
      name: _getStringValue(response.name),
      description: _getStringValue(response.description),
      year: response.year,
      local_ngo_name: _getStringValue(response.local_ngo_name),
      local_ngo_id: response.local_ngo_id,
      province: _getStringValue(response.province),
      district: _getStringValue(response.district),
      commune: _getStringValue(response.commune),
      program_id: response.program_id,
      downloaded_at: new Date(),
      primary_school: response.primary_school != null ? JSON.stringify(response.primary_school) : null,
      planned_start_date: Moment(response.planned_start_date).format(apiDateFormat),
      planned_end_date: Moment(response.planned_end_date).format(apiDateFormat),
      endpoint_url: await settingHelper.getFullyEndpointUrl(),
      program_uuid: response.program_uuid,
    })
  }

  // private method
  function _getStringValue(value){
    return !!value ? value : '';
  }
})();

export default scorecardDataUtil;