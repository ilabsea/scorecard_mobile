import Facilitator from '../models/Facilitator';

const facilitatorAttributesUtil = (() => {
  return {
    parse
  };

  function parse(scorecard) {
    let facilitators = Facilitator.getAll(scorecard.uuid);
    let data = facilitators.map(facilitator => ({
      caf_id: facilitator.id,
      position: facilitator.position,
      scorecard_uuid: facilitator.scorecard_uuid
    }));

    return { 'facilitators_attributes': data };
  }
})();

export default facilitatorAttributesUtil;