import Scorecard from '../migrations/v2/scorecard';
import schemaHelper from '../../helpers/schema_helper';
import { schemaNames } from '../../constants/schema_constant';

const changedSchemas = [
  { label: schemaNames[0], data: Scorecard }
];

const schemaV2 = {
  schema: schemaHelper.getSchemas(changedSchemas),
  schemaVersion: 2,
  migration: (oldRealm, newRealm) => {

    if (oldRealm.schemaVersion < 2) {
      const oldObjects = oldRealm.objects('Scorecard');
      const newObjects = newRealm.objects('Scorecard');

      for (let i = 0; i < oldObjects.length; i++) {
        newObjects[i].tour_tip_shown = !oldObjects[i].tour_tip_shown ? false : oldObjects[i].tour_tip_shown;
      }
    }
  }
};

export default schemaV2;