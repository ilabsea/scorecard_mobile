import Moment from 'moment';
import DeviceInfo from 'react-native-device-info'
import VersionCheck from 'react-native-version-check';
import Facilitator from '../models/Facilitator';
import Participant from '../models/Participant';
import { getNestedAttributes } from './scorecard_nested_attributes_util';
import onlineVotingAttributesUtil from './online_voting_attributes_util';
import MobileTokenService from '../services/mobile_token_service';
import { OFFLINE, ONLINE } from '../constants/scorecard_constant';

export const scorecardAttributes = async ({scorecard, isFinalSubmit}) => {
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
    number_of_anonymous: Participant.getAnonymousByScorecard(scorecard.uuid).length,
    language_conducted_code: scorecard.audio_language_code,
    finished_date: scorecard.finished_date ? scorecard.finished_date : null,
    running_date: scorecard.running_date ? scorecard.running_date : null,
    device_type: DeviceInfo.isTablet() ? 'tablet' : 'mobile',
    device_token: await MobileTokenService.getToken(),
    proposed_indicator_method: scorecard.proposed_indicator_method,
    app_version: VersionCheck.getCurrentBuildNumber()
  };

  if (!isFinalSubmit || (scorecard.running_mode == OFFLINE))
    scorecardAttributes = {...scorecardAttributes, ...getNestedAttributes(scorecard)};
  else if (isFinalSubmit && scorecard.running_mode == ONLINE)
    scorecardAttributes = { ...scorecardAttributes, ...onlineVotingAttributesUtil.parse(scorecard) }

  return scorecardAttributes;
}