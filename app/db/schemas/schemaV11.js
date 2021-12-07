import ProgramLanguage from '../migrations/v3/programLanguage';
import Scorecard from '../migrations/v11/scorecard';
import VotingCriteria from '../migrations/v9/votingCriteria';
import schemaHelper from '../../helpers/schema_helper';
import { schemaNames } from '../../constants/schema_constant';

const changedSchemas = [
  { label: schemaNames[0], data: Scorecard },
  { label: schemaNames[9], data: VotingCriteria },
  { label: schemaNames[13], data: ProgramLanguage },
];

const schemaV11 = {
  schema: schemaHelper.getSchemas(changedSchemas),
  schemaVersion: 11,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 11) {
      const oldObjects = oldRealm.objects('Scorecard');
      const newObjects = newRealm.objects('Scorecard');

      oldObjects.map((oldObject, index) => {
        newObjects[index].conducted_time = !oldObject.conducted_time ? null : oldObject.conducted_time;
      });
    }
  }
}

export default schemaV11;