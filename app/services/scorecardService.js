import realm from '../db/schema';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export const uploadToServer = async (scorecard_uuid) => {
  const scorecard = realm.objects('Scorecard').filtered(`uuid='${scorecard_uuid}'`)[0];
  let setting = '';

  if (!scorecard || !scorecard.isCompleted) {
    return;
  }

  try {
    setting = await AsyncStorage.getItem('SETTING');

    if (!!setting) {
      setting = JSON.parse(setting);

      uploadCustomIndicatorsWithAudio();
    }
  } catch (error) {
    console.log('============error', error);
  }

  // Step1
  function uploadCustomIndicatorsWithAudio() {
    let custom_indicators = JSON.parse(JSON.stringify(realm.objects('CustomIndicator').filtered(`scorecard_uuid='${scorecard_uuid}'`)));
    custom_indicators = custom_indicators.filter(x => !x.id_from_server);

    uploadCustomIndicator(0, custom_indicators);
  }

  function uploadCustomIndicator(index, custom_indicators) {
    if (index == custom_indicators.length) {
      uploadScorecard();
      return;
    }

    let customIndicator = custom_indicators[index];
    let url = `${setting.backendUrl}/api/v1/scorecards/${scorecard_uuid}/custom_indicators`;
    let header = {
      Accept: 'applcation/json',
      'Content-Type': 'multipart/form-data',
      Authorization: setting.token,
    }

    axios.post(url, customIndicatorData(customIndicator), { headers: header })
      .then(function (response) {
        if (response.status == 201) {
          realm.write(() => {
            realm.create('CustomIndicator', { uuid: customIndicator.uuid, id_from_server: response.data.id }, 'modified');
          })
        }

        uploadCustomIndicator(index+1, custom_indicators);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Step2
  function uploadScorecard() {
    let attrs = scorecardAttr();
    attrs.facilitators_attributes = facilitatorsAttr();
    attrs.participants_attributes = participantsAttr();
    attrs.raised_indicators_attributes = proposedCriteriasAttr();
    attrs.voting_indicators_attributes = votingCriteriasAttr();
    attrs.ratings_attributes = ratingsAttr();

    let url = `${setting.backendUrl}/api/v1/scorecards/${scorecard_uuid}`;
    let header = {
      Accept: 'applcation/json',
      Authorization: setting.token,
    }

    axios.put(url, {scorecard: attrs}, { headers: header })
      .then(function (response) {
        if (response.status == 201) {
          realm.write(() => {
            realm.create('Scorecard', { uuid: scorecard_uuid, uploaded: true }, 'modified');
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function ratingsAttr() {
    let ratings = realm.objects('Rating').filtered(`scorecard_uuid='${scorecard_uuid}'`);

    let data = ratings.map(rating => {
      return {
        uuid: rating.uuid,
        voting_indicator_uuid: rating.voting_criteria_uuid,
        scorecard_uuid: rating.scorecard_uuid,
        participant_uuid: rating.participant_uuid,
        score: rating.score,
      };
    })

    return data;
  }

  function votingCriteriasAttr() {
    let customIndicators = realm.objects('CustomIndicator').filtered(`scorecard_uuid='${scorecard_uuid}'`);
    let votingCriterias = realm.objects('VotingCriteria').filtered(`scorecard_uuid='${scorecard_uuid}'`);
    let participants = realm.objects('Participant').filtered(`scorecard_uuid='${scorecard_uuid}'`);

    let data = votingCriterias.map(criteria => {
      let indicatorable_id = criteria.indicatorable_id;
      let indicatorable_type = 'Indicator';

      if (criteria.indicatorable_type != 'predefined') {
        indicatorable_id = customIndicators.filter(x => x.uuid == indicatorable_id)[0].id_from_server;
        indicatorable_type = 'CustomIndicator';
      }

      return {
        scorecard_uuid: criteria.scorecard_uuid,
        indicatorable_id: indicatorable_id,
        indicatorable_type: indicatorable_type,
        median: criteria.median,
        strength: criteria.strength,
        weakness: criteria.weakness,
        desired_change: criteria.desired_change,
        suggested_action: criteria.suggested_action
      };
    })

    return data;
  }

  function proposedCriteriasAttr() {
    let customIndicators = realm.objects('CustomIndicator').filtered(`scorecard_uuid='${scorecard_uuid}'`);
    let proposedCriterias = realm.objects('ProposedCriteria').filtered(`scorecard_uuid='${scorecard_uuid}'`);
    let participants = realm.objects('Participant').filtered(`scorecard_uuid='${scorecard_uuid}'`);

    let data = proposedCriterias.map(criteria => {
      let indicatorable_id = criteria.indicatorable_id;
      let indicatorable_type = 'Indicator';

      if (criteria.indicatorable_type != 'predefined') {
        indicatorable_id = customIndicators.filter(x => x.uuid == indicatorable_id)[0].id_from_server;
        indicatorable_type = 'CustomIndicator';
      }

      return {
        scorecard_uuid: criteria.scorecard_uuid,
        indicatorable_id: indicatorable_id,
        indicatorable_type: indicatorable_type,
        participant_uuid: criteria.participant_uuid,
        tag_attributes: { name: criteria.tag },
      };
    })

    return data;
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
    let participants = JSON.parse(JSON.stringify(realm.objects('Participant').filtered(`scorecard_uuid='${scorecard_uuid}'`)));
    let columns = ['uuid', 'age', 'gender', 'disability', 'minority', 'youth', 'scorecard_uuid'];

    let attrs = participants.map(participant => {
      let attr = Object.keys(participant)
        .filter(key => columns.indexOf(key) >= 0)
        .reduce((obj2, key) => Object.assign(obj2, { [key]: participant[key] }), {});

      attr.poor_card = participant.poor;

      return attr;
    });

    return attrs;
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
}
