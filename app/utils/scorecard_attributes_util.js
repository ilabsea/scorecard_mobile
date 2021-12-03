import Moment from 'moment';
import DeviceInfo from 'react-native-device-info'
import realm from '../db/schema';
import Facilitator from '../models/Facilitator';
import Participant from '../models/Participant';
import VotingCriteria from '../models/VotingCriteria';
import { getSuggestedActionAttrs } from '../helpers/voting_criteria_helper';
import { apiDateFormat } from '../constants/date_format_constant';

export const scorecardAttributes = (scorecard) => {
  let facilitators = Facilitator.getAll(scorecard.uuid);
  let participants = Participant.getAll(scorecard.uuid);

  return {
    conducted_date: Moment(scorecard.conducted_date, 'DD/MM/YYYY').format(apiDateFormat),
    number_of_caf: facilitators.length,
    number_of_participant: participants.length,
    number_of_female: participants.filter(p => p.gender == "female").length,
    number_of_disability: participants.filter(p => !!p.disability).length,
    number_of_ethnic_minority: participants.filter(p => !!p.minority).length,
    number_of_youth: participants.filter(p => !!p.youth).length,
    number_of_id_poor: participants.filter(p => !!p.poor).length,
    facilitators_attributes: _facilitatorsAttrs(scorecard),
    participants_attributes: _participantsAttrs(scorecard),
    raised_indicators_attributes: _proposedCriteriasAttrs(scorecard),
    voting_indicators_attributes: _votingCriteriasAttrs(scorecard),
    ratings_attributes: _ratingsAttrs(scorecard),
    language_conducted_code: scorecard.audio_language_code,
    finished_date: scorecard.finished_date ? scorecard.finished_date : null,
    running_date: scorecard.running_date ? scorecard.running_date : null,
    device_type: DeviceInfo.isTablet() ? 'tablet' : 'mobile'
  }
}

// Private methods
const _facilitatorsAttrs = (scorecard) => {
  let facilitators = Facilitator.getAll(scorecard.uuid);
  let data = facilitators.map(facilitator => ({
    caf_id: facilitator.id,
    position: facilitator.position,
    scorecard_uuid: facilitator.scorecard_uuid
  }));

  return data;
}

const _participantsAttrs = (scorecard) => {
  let participants = _getJSON('Participant', scorecard);
  let columns = ['uuid', 'age', 'gender', 'disability', 'minority', 'youth', 'scorecard_uuid'];

  return participants.map(participant => {
    let attr = _getAttributes(participant, columns);
    attr.poor_card = participant.poor;

    return attr;
  });
}

const _proposedCriteriasAttrs = (scorecard) => {
  let proposedCriterias = _getJSON('ProposedCriteria', scorecard);
  let columns = ['scorecard_uuid', 'participant_uuid'];

  return _getCriteriaAttrs(proposedCriterias, columns, true);
}

const _votingCriteriasAttrs = (scorecard) => {
  let votingCriterias = JSON.parse(JSON.stringify(VotingCriteria.getAll(scorecard.uuid)));
  let columns = ['uuid', 'scorecard_uuid', 'median', 'strength', 'weakness', 'suggested_action'];

  let votingCriteriaAttr = _getCriteriaAttrs(votingCriterias, columns);
  votingCriteriaAttr.map((votingCriteria, index) => {
    votingCriteriaAttr[index].strength = votingCriteria.strength ? JSON.parse(votingCriteria.strength) : null;
    votingCriteriaAttr[index].weakness = votingCriteria.weakness ? JSON.parse(votingCriteria.weakness) : null;
    votingCriteriaAttr[index].suggested_action = votingCriteria.suggested_action ? JSON.parse(votingCriteria.suggested_action) : null;
    votingCriteriaAttr[index].suggested_actions_attributes = getSuggestedActionAttrs(scorecard.uuid, votingCriteria.uuid);
  });

  return votingCriteriaAttr;
}

const _ratingsAttrs = (scorecard) => {
  let ratings = _getJSON('Rating', scorecard);
  let columns = ['uuid', 'scorecard_uuid', 'participant_uuid', 'score'];

  return ratings.map(rating => {
    let attr = _getAttributes(rating, columns);
    attr.voting_indicator_uuid = rating.voting_criteria_uuid;
    return attr;
  });
}

const _getAttributes = (obj, columns) => {
  return Object.keys(obj)
    .filter(key => columns.indexOf(key) >= 0)
    .reduce((obj2, key) => Object.assign(obj2, { [key]: obj[key] }), {});
}

const _getCriteriaAttrs = (criterias, columns, has_tag) => {
  return criterias.map(criteria => {
    let indicator = _getIndicator(criteria);
    let attr = _getAttributes(criteria, columns);

    attr.indicatorable_id = indicator.id;
    attr.indicatorable_type = indicator.type;

    if (!!has_tag) {
      attr.tag_attributes = { name: criteria.tag }
    }

    return attr;
  })
}

const _getIndicator = (criteria) => {
  let indicatorable_id = criteria.indicatorable_id;
  let indicatorable_type = 'Indicator';

  if (criteria.indicatorable_type != 'predefined') {
    indicatorable_id = this.customIndicators.filter(x => x.uuid == indicatorable_id)[0].id_from_server;
    indicatorable_type = 'CustomIndicator';
  }

  return { id: indicatorable_id, type: indicatorable_type };
}

const _getJSON = (realmModelName, scorecard) => {
  return JSON.parse(JSON.stringify(realm.objects(realmModelName).filtered(`scorecard_uuid='${scorecard.uuid}'`)));
}