import ProgramLanguage from '../migrations/v3/programLanguage';
import Scorecard from '../migrations/v24/scorecard';
import ProposedIndicator from '../migrations/v12/proposedIndicator';
import Indicator from '../migrations/v19/indicator';
import LanguageIndicator from '../migrations/v19/languageIndicator';
import EndpointUrl from '../migrations/v20/endpointUrl';
import Rating from '../migrations/v14/rating';
import VotingIndicator from '../migrations/v24/votingIndicator';
import Facilitator from '../migrations/v16/facilitator';
import Participant from '../migrations/v23/participant';

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

const schemaV24 = {
  schema: schemaHelper.getSchemas(changedSchemas),
  schemaVersion: 24,
  migration: (oldRealm, newRealm) => {
  }
}

export default schemaV24;
