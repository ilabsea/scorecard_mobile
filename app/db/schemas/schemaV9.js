import ProgramLanguage from '../migrations/v3/programLanguage';
import Scorecard from '../migrations/v8/scorecard';
import VotingCriteria from '../migrations/v9/votingCriteria';
import schemaHelper from '../../helpers/schema_helper';
import { schemaNames } from '../../constants/schema_constant';

const changedSchemas = [
  { label: schemaNames[0], data: Scorecard },
  { label: schemaNames[9], data: VotingCriteria },
  { label: schemaNames[13], data: ProgramLanguage },
];

const schemaV9 = {
  schema: schemaHelper.getSchemas(changedSchemas),
  schemaVersion: 9,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 9) {
      const oldObjects = oldRealm.objects('VotingCriteria');
      const newObjects = newRealm.objects('VotingCriteria');

      oldObjects.map((oldObject, index) => {
        newObjects[index].order = !oldObject.order ? (index + 1) : oldObject.order;
      });
    }
  }
}

export default schemaV9;