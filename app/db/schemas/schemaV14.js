import ProgramLanguage from '../migrations/v3/programLanguage';
import Scorecard from '../migrations/v11/scorecard';
// import VotingCriteria from '../migrations/v9/votingCriteria';
import ProposedIndicator from '../migrations/v12/proposedIndicator';
import votingIndicator from '../migrations/v14/votingIndicator';
import schemaHelper from '../../helpers/schema_helper';
import { schemaNames } from '../../constants/schema_constant';

const changedSchemas = [
  { label: schemaNames[0], data: Scorecard },
  // { label: schemaNames[9], data: VotingCriteria },
  { label: schemaNames[13], data: ProgramLanguage },
  { label: schemaNames[17], data: ProposedIndicator },
  { label: schemaNames[18], data: votingIndicator }
];

const schemaV14 = {
  schema: schemaHelper.getSchemas(changedSchemas),
  schemaVersion: 14,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 14) {
      const votingCriterias = oldRealm.objects('VotingCriteria');

      votingCriterias.map(votingCriteria => {
        newRealm.delete(votingCriteria);
        newRealm.create('VotingIndicator', votingCriteria, 'modified');
      });
    }
  }
}

export default schemaV14;