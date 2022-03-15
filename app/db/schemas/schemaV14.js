import ProgramLanguage from '../migrations/v3/programLanguage';
import Scorecard from '../migrations/v11/scorecard';
// import VotingCriteria from '../migrations/v9/votingCriteria';
import ProposedIndicator from '../migrations/v12/proposedIndicator';
import Rating from '../migrations/v14/rating';
import VotingIndicator from '../migrations/v14/votingIndicator';
import schemaHelper from '../../helpers/schema_helper';
import { schemaNames } from '../../constants/schema_constant';

const changedSchemas = [
  { label: schemaNames[0], data: Scorecard },
  { label: schemaNames[10], data: Rating },
  { label: schemaNames[13], data: ProgramLanguage },
  { label: schemaNames[17], data: ProposedIndicator },
  { label: schemaNames[18], data: VotingIndicator }
];

const schemaV14 = {
  schema: schemaHelper.getSchemas(changedSchemas),
  schemaVersion: 14,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 14) {
      const votingCriterias = oldRealm.objects('VotingCriteria');
      const oldRatings = oldRealm.objects('Rating');
      const newRatings = newRealm.objects('Rating');

      oldRatings.map((oldRating, index) => {
        newRatings[index].voting_indicator_uuid = oldRating.voting_criteria_uuid;
      });

      votingCriterias.map(votingCriteria => {
        newRealm.delete(votingCriteria);
        newRealm.create('VotingIndicator', votingCriteria, 'modified');
      });
    }
  }
}

export default schemaV14;