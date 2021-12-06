import Moment from 'moment';
import DeviceInfo from 'react-native-device-info'
import Facilitator from '../models/Facilitator';
import Participant from '../models/Participant';
import { apiDateFormat } from '../constants/date_format_constant';
import { getNestedAttributes } from './scorecard_nested_attributes_util';

export const scorecardAttributes = (scorecard) => {
  let facilitators = Facilitator.getAll(scorecard.uuid);
  let participants = Participant.getAll(scorecard.uuid);

  let scorecardAttributes = {
    conducted_date: Moment(scorecard.conducted_date, 'DD/MM/YYYY').format(apiDateFormat),
    number_of_caf: facilitators.length,
    number_of_participant: participants.length,
    number_of_female: participants.filter(p => p.gender == "female").length,
    number_of_disability: participants.filter(p => !!p.disability).length,
    number_of_ethnic_minority: participants.filter(p => !!p.minority).length,
    number_of_youth: participants.filter(p => !!p.youth).length,
    number_of_id_poor: participants.filter(p => !!p.poor).length,
    language_conducted_code: scorecard.audio_language_code,
    finished_date: scorecard.finished_date ? scorecard.finished_date : null,
    running_date: scorecard.running_date ? scorecard.running_date : null,
    device_type: DeviceInfo.isTablet() ? 'tablet' : 'mobile',
  };

  scorecardAttributes = {...scorecardAttributes, ...getNestedAttributes(scorecard)};

  return scorecardAttributes;
}