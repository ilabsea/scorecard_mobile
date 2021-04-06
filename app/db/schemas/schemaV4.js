import ProgramLanguage from '../migrations/v3/programLanguage';
import Scorecard from '../migrations/v4/scorecard';
import schemaHelper from '../../helpers/schema_helper';
import { schemaNames } from '../../constants/schema_constant';

import ScorecardModel from '../../models/Scorecard';

const changedSchemas = [
  { label: schemaNames[0], data: Scorecard },
  { label: schemaNames[13], data: ProgramLanguage },
];

const schemaV4 = {
  schema: schemaHelper.getSchemas(changedSchemas),
  schemaVersion: 4,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 4) {
      const oldObjects = oldRealm.objects('Scorecard');
      const newObjects = newRealm.objects('Scorecard');

      for (let i = 0; i < oldObjects.length; i++) {
        newObjects[i].milestone = !oldObjects[i].milestone ? ScorecardModel.getMilestone(oldObjects[i]) : oldObjects[i].milestone;
      }
    }
  }
};

export default schemaV4;