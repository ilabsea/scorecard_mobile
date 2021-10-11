import ProgramLanguage from '../migrations/v3/programLanguage';
import Scorecard from '../migrations/v8/scorecard';
import VotingCriteria from '../migrations/v7/votingCriteria';
import schemaHelper from '../../helpers/schema_helper';
import { schemaNames } from '../../constants/schema_constant';

const changedSchemas = [
  { label: schemaNames[0], data: Scorecard },
  { label: schemaNames[9], data: VotingCriteria },
  { label: schemaNames[13], data: ProgramLanguage },
];

const schemaV8 = {
  schema: schemaHelper.getSchemas(changedSchemas),
  schemaVersion: 8,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 8) {
      const oldObjects = oldRealm.objects('Scorecard');
      const newObjects = newRealm.objects('Scorecard');

      for (let i = 0; i < oldObjects.length; i++) {
        newObjects[i].planned_start_date = !oldObjects[i].planned_start_date ? null : oldObjects[i].planned_start_date;
        newObjects[i].planned_end_date = !oldObjects[i].planned_end_date ? null : oldObjects[i].planned_end_date;
      }
    }
  }
}

export default schemaV8;