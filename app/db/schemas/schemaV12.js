import Moment from 'moment';
import ProgramLanguage from '../migrations/v3/programLanguage';
import Scorecard from '../migrations/v11/scorecard';
import VotingCriteria from '../migrations/v9/votingCriteria';
import ProposedIndicator from '../migrations/v12/proposedIndicator';
import schemaHelper from '../../helpers/schema_helper';
import { schemaNames } from '../../constants/schema_constant';

const changedSchemas = [
  { label: schemaNames[0], data: Scorecard },
  { label: schemaNames[9], data: VotingCriteria },
  { label: schemaNames[13], data: ProgramLanguage },
  { label: schemaNames[17], data: ProposedIndicator },
];

const schemaV12 = {
  schema: schemaHelper.getSchemas(changedSchemas),
  schemaVersion: 12,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 12) {
      const proposedCriterias = oldRealm.objects('ProposedCriteria');

      proposedCriterias.map((proposedCriteria, index) => {
        let data = proposedCriteria;
        data['order'] = index + 1;

        console.log(`Proposed indicator ${index} = `, data);

        newRealm.write(() => {
          newRealm.create('ProposedIndicator', data, 'modified');
        });
      });
    }
  }
}

export default schemaV12;