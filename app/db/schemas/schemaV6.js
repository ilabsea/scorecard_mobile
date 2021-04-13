import ProgramLanguage from '../migrations/v3/programLanguage';
import Scorecard from '../migrations/v6/scorecard';
import schemaHelper from '../../helpers/schema_helper';
import { schemaNames } from '../../constants/schema_constant';

const changedSchemas = [
  { label: schemaNames[0], data: Scorecard },
  { label: schemaNames[13], data: ProgramLanguage },
];

const schemaV5 = {
  schema: schemaHelper.getSchemas(changedSchemas),
  schemaVersion: 6,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 6) {
      const oldObjects = oldRealm.objects('Scorecard');
      const newObjects = newRealm.objects('Scorecard');

      for (let i = 0; i < oldObjects.length; i++) {
        newObjects[i].finished_date = !oldObjects[i].finished_date ? null : new Date(oldObjects[i].finished_date);
        newObjects[i].running_date = !oldObjects[i].running_date ? null : new Date(oldObjects[i].running_date);
      }
    }
  }
};

export default schemaV5;