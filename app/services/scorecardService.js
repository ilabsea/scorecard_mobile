import realm from '../db/schema';
import ScorecardApi from '../api/ScorecardApi';
import CustomIndicatorApi from '../api/CustomIndicatorApi';

const scorecardService = (() => {
  const scorecardApi = new ScorecardApi();
  const customIndicatorApi = new CustomIndicatorApi();
  var scorecard, customIndicators, scorecard_uuid;

  return {
    upload
  }

  function upload(uuid) {
    scorecard_uuid = uuid;
    scorecard = realm.objects('Scorecard').filtered(`uuid='${scorecard_uuid}'`)[0];
    customIndicators = realm.objects('CustomIndicator').filtered(`scorecard_uuid='${scorecard_uuid}'`);

    if (!scorecard || !scorecard.isCompleted) {
      return;
    }

    try {
      let indicators = customIndicators.filter(x => !!x.id_from_server);

      uploadCustomIndicator(0, indicators);
    } catch (error) {
      console.log(error);
    }
  }

  // ------Step1------
  // upload all custom criterias then upload scorecard with its dependcy
  function uploadCustomIndicator(index, customIndicators) {
    if (index == customIndicators.length) {
      uploadScorecard();
      return ;
    }

    let customIndicator = customIndicators[index];

    customIndicatorApi.post(scorecard_uuid, customIndicatorData(customIndicator))
      .then(function (response) {
        if (response.status == 201) {
          realm.write(() => {
            customIndicator.id_from_server = response.data.id;
          });
        }

        uploadCustomIndicator(index + 1, customIndicators);
      });
  }

  // ------Step2------
  function uploadScorecard() {
    let attrs = scorecardAttr();
    attrs.facilitators_attributes = facilitatorsAttr();
    attrs.participants_attributes = participantsAttr();
    attrs.raised_indicators_attributes = proposedCriteriasAttr();
    attrs.voting_indicators_attributes = votingCriteriasAttr();
    attrs.ratings_attributes = ratingsAttr();

    scorecardApi.put(scorecard_uuid, attrs)
      .then(function (response) {
        if (response.status == 201) {
          realm.write(() => {
            scorecard.uploaded = true;
          });
        }
      });
  }

  // Praviate methods
  function ratingsAttr() {
    let ratings = getJSON('Rating');
    let columns = ['uuid', 'scorecard_uuid', 'participant_uuid', 'score'];

    return ratings.map(rating => {
      let attr = getAttributes(rating, columns);
      attr.voting_indicator_uuid = rating.voting_criteria_uuid;
      return attr;
    });
  }

  function getIndicator(criteria) {
    let indicatorable_id = criteria.indicatorable_id;
    let indicatorable_type = 'Indicator';

    if (criteria.indicatorable_type != 'predefined') {
      indicatorable_id = customIndicators.filter(x => x.uuid == indicatorable_id)[0].id_from_server;
      indicatorable_type = 'CustomIndicator';
    }

    return { id: indicatorable_id, type: indicatorable_type };
  }

  function votingCriteriasAttr() {
    let votingCriterias = getJSON('VotingCriteria');
    let columns = ['scorecard_uuid', 'median', 'strength', 'weakness', 'desired_change', 'suggested_action'];

    return getCriteriaAttr(votingCriterias, columns);
  }

  function getCriteriaAttr(criterias, columns, has_tag) {
    return criterias.map(criteria => {
      let indicator = getIndicator(criteria);
      let attr = getAttributes(criteria, columns);

      attr.indicatorable_id = indicator.id;
      attr.indicatorable_type = indicator.type;

      if (!!has_tag) {
        attr.tag_attributes = { name: criteria.tag }
      }

      return attr;
    })
  }

  function proposedCriteriasAttr() {
    let proposedCriterias = getJSON('ProposedCriteria');
    let columns = ['scorecard_uuid', 'participant_uuid'];

    return getCriteriaAttr(proposedCriterias, columns, true);
  }

  function scorecardAttr() {
    return {
      conducted_date: scorecard.conducted_date,
      number_of_caf: scorecard.number_of_caf,
      number_of_participant: scorecard.number_of_participant,
      number_of_female: scorecard.number_of_female,
      number_of_disability: scorecard.number_of_disability,
      number_of_ethnic_minority: scorecard.number_of_ethnic_minority,
      number_of_youth: scorecard.number_of_youth,
      number_of_id_poor: scorecard.number_of_id_poor,
    }
  }

  function participantsAttr() {
    let participants = getJSON('Participant');
    let columns = ['uuid', 'age', 'gender', 'disability', 'minority', 'youth', 'scorecard_uuid'];

    return participants.map(participant => {
      let attr = getAttributes(participant, columns);
      attr.poor_card = participant.poor;

      return attr;
    });
  }

  function getAttributes(obj, columns) {
    return Object.keys(obj)
      .filter(key => columns.indexOf(key) >= 0)
      .reduce((obj2, key) => Object.assign(obj2, { [key]: obj[key] }), {});
  }

  function facilitatorsAttr() {
    let facilitators = realm.objects('Facilitator').filtered(`scorecard_uuid='${scorecard_uuid}'`);
    let data = facilitators.map(facilitator => ({
      caf_id: facilitator.id,
      position: facilitator.position,
      scorecard_uuid: facilitator.scorecard_uuid
    }));

    return data;
  }

  function getJSON(realmModelName) {
    return JSON.parse(JSON.stringify(realm.objects(realmModelName).filtered(`scorecard_uuid='${scorecard_uuid}'`)));
  }

  function customIndicatorData(indicator) {
    let attrs = {
      uuid: indicator.uuid,
      name: indicator.name,
      tag_attributes: { name: indicator.tag },
    };

    let data = new FormData();
    data.append('custom_indicator', JSON.stringify(attrs));

    if (!!indicator.local_audio) {
      data.append('audio', {
        uri: 'file://' + indicator.local_audio,
        type: 'audio/x-mp4',
        name: 'audio.mp4'
      });
    }

    return data;
  }
})();

export default scorecardService;
