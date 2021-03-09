import Scorecard from '../migrations/v2/scorecard';
import ProgramLanguage from '../migrations/v3/programLanguage';
import schemaHelper from '../../helpers/schema_helper';
import { schemaNames } from '../../constants/schema_constant';

const changedSchemas = [
  { label: schemaNames[0], data: Scorecard },
  { label: schemaNames[13], data: ProgramLanguage }
];

const schemaV3 = {
  schema: schemaHelper.getSchemas(changedSchemas),
  schemaVersion: 3,
  migration: (oldRealm, newRealm) => {

    if (oldRealm.schemaVersion < 3) {
      const oldObjects = oldRealm.objects('ProgramLanguage');
      const newObjects = newRealm.objects('ProgramLanguage');

      for (let i = 0; i < oldObjects.length; i++) {
        newObjects[i].name_en = !oldObjects[i].name_en ? '' : oldObjects[i].name_en;
        newObjects[i].name_km = !oldObjects[i].name_km ? '' : oldObjects[i].name_km;
      }
    }
  }
};

export default schemaV3; 