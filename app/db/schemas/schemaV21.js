import ProgramLanguage from '../../migrations/v3/programLanguage';
import Scorecard from '../../migrations/v21/scorecard';
import ProposedIndicator from '../../migrations/v12/proposedIndicator';
import Indicator from '../../migrations/v19/indicator';
import LanguageIndicator from '../../migrations/v19/languageIndicator';
import EndpointUrl from '../../migrations/v20/endpointUrl';
import Rating from '../../migrations/v14/rating';
import VotingIndicator from '../../migrations/v14/votingIndicator';
import Facilitator from '../../migrations/v16/facilitator';
import Participant from '../../migrations/v21/participant';

import schemaHelper from '../../helpers/schema_helper';
import { schemaNames } from '../../constants/schema_constant';

const changedSchemas = [
  { label: schemaNames[0], data: Scorecard },
  { label: schemaNames[2], data: Indicator },
  { label: schemaNames[4], data: LanguageIndicator },
  { label: schemaNames[5], data: Facilitator },
  { label: schemaNames[6], data: Participant },
  { label: schemaNames[10], data: Rating },
  { label: schemaNames[13], data: ProgramLanguage },
  { label: schemaNames[17], data: ProposedIndicator },
  { label: schemaNames[18], data: VotingIndicator },
  { label: schemaNames[20], data: EndpointUrl }
];

const schemaV21 = {
  schema: schemaHelper.getSchemas(changedSchemas),
  schemaVersion: 21,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 21) {
      const oldScorecards = oldRealm.objects('Scorecard');
      const newScorecards = newRealm.objects('Scorecard');

      for (let i = 0; i < oldScorecards.length; i ++) {
        // If the existing scorecard has milestone as null or downloaded, it means the scorecard didn't upload the running milestone yet
        const isUploaded = (!oldScorecards[i].milestone || oldScorecards[i].milestone == DOWNLOADED) ? false : true;
        newScorecards[i].running_status_uploaded = !oldScorecards[i].running_status_uploaded ? isUploaded : oldScorecards[i].running_status_uploaded;
      }

      const oldParticipants = oldRealm.objects('Participant');
      const newParticipants = newRealm.objects('Participant');

      for (let i = 0; i < oldParticipants.length; i ++) {
        newParticipants[i].counted = !oldParticipants[i].counted ? true : oldParticipants[i].counted;
      }
    }
  }
}

export default schemaV21;
