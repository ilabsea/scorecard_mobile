import ProgramLanguage from '../migrations/v3/programLanguage';
import Scorecard from '../migrations/v6/scorecard';
import VotingCriteria from '../migrations/v7/votingCriteria';
import schemaHelper from '../../helpers/schema_helper';
import { schemaNames } from '../../constants/schema_constant';

const changedSchemas = [
  { label: schemaNames[0], data: Scorecard },
  { label: schemaNames[9], data: VotingCriteria },
  { label: schemaNames[13], data: ProgramLanguage },
];

const schemaV7 = {
  schema: schemaHelper.getSchemas(changedSchemas),
  schemaVersion: 7,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 7) {
      const oldObjects = oldRealm.objects('VotingCriteria');
      const newObjects = newRealm.objects('VotingCriteria');

      for (let i = 0; i < oldObjects.length; i++) {
        newObjects[i].suggested_action_status = !oldObjects[i].suggested_action_status ? [] : oldObjects[i].suggested_action_status;
      }
    }
  }
}

export default schemaV7;