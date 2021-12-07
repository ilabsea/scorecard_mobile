import Moment from 'moment';
import ProgramLanguage from '../migrations/v3/programLanguage';
import Scorecard from '../migrations/v10/scorecard';
import VotingCriteria from '../migrations/v9/votingCriteria';
import schemaHelper from '../../helpers/schema_helper';
import { schemaNames } from '../../constants/schema_constant';

const changedSchemas = [
  { label: schemaNames[0], data: Scorecard },
  { label: schemaNames[9], data: VotingCriteria },
  { label: schemaNames[13], data: ProgramLanguage },
];

const schemaV10 = {
  schema: schemaHelper.getSchemas(changedSchemas),
  schemaVersion: 10,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 10) {
      const oldObjects = oldRealm.objects('Scorecard');
      const newObjects = newRealm.objects('Scorecard');

      oldObjects.map((oldObject, index) => {
        newObjects[index].uploaded_date = !oldObject.uploaded_date ? null : Moment(oldObject.uploaded_date, 'ddd MMM DD YYYY').utcOffset(0, true).toDate();
      });
    }
  }
}

export default schemaV10;