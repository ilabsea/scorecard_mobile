import Participant from '../models/Participant';
import { getAttributesByColumns } from '../helpers/scorecard_attributes_helper';

const participantAttributesUtil = (() => {
  return {
    parse
  };

  function parse(scorecard) {
    let participants = JSON.parse(JSON.stringify(Participant.getAll(scorecard.uuid)));
    let columns = ['uuid', 'age', 'gender', 'disability', 'minority', 'youth', 'scorecard_uuid'];

    let data = participants.map(participant => {
      let attr = getAttributesByColumns(participant, columns);
      attr.poor_card = participant.poor;

      return attr;
    });

    return { 'participants_attributes': data };
  }
})();

export default participantAttributesUtil;