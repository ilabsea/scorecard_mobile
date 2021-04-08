import ProgramLanguage from '../migrations/v3/programLanguage';
import Scorecard from '../migrations/v5/scorecard';
import schemaHelper from '../../helpers/schema_helper';
import { schemaNames } from '../../constants/schema_constant';

import uuidv4 from '../../utils/uuidv4';

const changedSchemas = [
  { label: schemaNames[0], data: Scorecard },
  { label: schemaNames[13], data: ProgramLanguage },
];

const schemaV5 = {
  schema: schemaHelper.getSchemas(changedSchemas),
  schemaVersion: 5,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 5) {
      const oldObjects = oldRealm.objects('Scorecard');
      const newObjects = newRealm.objects('Scorecard');

      for (let i = 0; i < oldObjects.length; i++) {
        newObjects[i].uuid_on_app = !oldObjects[i].uuid_on_app ? uuidv4() : oldObjects[i].uuid_on_app;
      }
    }
  }
};

export default schemaV5;