import ProgramLanguage from '../migrations/v3/programLanguage';
import Scorecard from '../migrations/v17/scorecard';
import ProposedIndicator from '../migrations/v12/proposedIndicator';
import Indicator from '../migrations/v13/indicator';
import Rating from '../migrations/v14/rating';
import VotingIndicator from '../migrations/v14/votingIndicator';
import Facilitator from '../migrations/v16/facilitator';
import EndpointUrl from '../migrations/v19/endpointUrl';

import schemaHelper from '../../helpers/schema_helper';
import { schemaNames } from '../../constants/schema_constant';

const changedSchemas = [
  { label: schemaNames[0], data: Scorecard },
  { label: schemaNames[2], data: Indicator },
  { label: schemaNames[5], data: Facilitator },
  { label: schemaNames[10], data: Rating },
  { label: schemaNames[13], data: ProgramLanguage },
  { label: schemaNames[17], data: ProposedIndicator },
  { label: schemaNames[18], data: VotingIndicator },
  { label: schemaNames[20], data: EndpointUrl }
];

const schemaV19 = {
  schema: schemaHelper.getSchemas(changedSchemas),
  schemaVersion: 19,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 19) {
      const oldObjects = oldRealm.objects('EndpointUrl');
      const newObjects = newRealm.objects('EndpointUrl');

      oldObjects.map((oldObject, index) => {
        newObjects[index].username = !oldObject.username ? '' : oldObject.username;
        newObjects[index].password = !oldObject.password ? '' : oldObject.password;
        newObjects[index].shortcut = !oldObject.shortcut ? '' : oldObject.shortcut;
        newObjects[index].shortcut_color = !oldObject.shortcut_color ? '' : oldObject.shortcut_color;
      });
    }
  }
}

export default schemaV19;