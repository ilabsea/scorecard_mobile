import Moment from 'moment';
import DeviceInfo from 'react-native-device-info'
import Facilitator from '../models/Facilitator';
import Participant from '../models/Participant';
import { getNestedAttributes } from './scorecard_nested_attributes_util';
import MobileTokenService from '../services/mobile_token_service';

export const scorecardAttributes = async (scorecard) => {
  let facilitators = Facilitator.getAll(scorecard.uuid);
  let participants = Participant.getAllCountable(scorecard.uuid);
  const conductedTime = Moment(scorecard.conducted_at).format('HH:mm:ss ZZ');
  const conductedDate = Moment(scorecard.conducted_date + ' ' + conductedTime, 'DD/MM/YYYY HH:mm:ss ZZ').toDate();

  let scorecardAttributes = {
    conducted_date: conductedDate,
    number_of_caf: facilitators.length,
    number_of_participant: participants.length,
    number_of_female: participants.filter(p => p.gender == "female").length,
    number_of_disability: participants.filter(p => !!p.disability).length,
    number_of_ethnic_minority: participants.filter(p => !!p.minority).length,
    number_of_youth: participants.filter(p => !!p.youth).length,
    number_of_id_poor: participants.filter(p => !!p.poor).length,
    number_of_anonymous: Participant.getUncountableByScorecard(scorecard.uuid).length,
    language_conducted_code: scorecard.audio_language_code,
    finished_date: scorecard.finished_date ? scorecard.finished_date : null,
    running_date: scorecard.running_date ? scorecard.running_date : null,
    device_type: DeviceInfo.isTablet() ? 'tablet' : 'mobile',
    device_token: await MobileTokenService.getToken(),
    proposed_indicator_method: scorecard.proposed_indicator_method
  };

  scorecardAttributes = {...scorecardAttributes, ...getNestedAttributes(scorecard)};

  return scorecardAttributes;
}