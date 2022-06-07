import ProgramLanguage from '../../migrations/v3/programLanguage';
import Scorecard from '../../migrations/v19/scorecard';
import ProposedIndicator from '../../migrations/v12/proposedIndicator';
import Indicator from '../../migrations/v19/indicator';
import LanguageIndicator from '../../migrations/v19/languageIndicator';
import EndpointUrl from '../../migrations/v19/endpointUrl';
import Rating from '../../migrations/v14/rating';
import VotingIndicator from '../../migrations/v14/votingIndicator';
import Facilitator from '../../migrations/v16/facilitator';

import schemaHelper from '../../../helpers/schema_helper';
import { schemaNames } from '../../../constants/schema_constant';

import endpointUrlMigrationService from './endpoint_url_migration_service';
import languageIndicatorMigrationService from './language_indicator_migration_service';
import indicatorMigrationService from './indicator_migration_service';
import scorecardMigrationService from './scorecard_migration_service';

const changedSchemas = [
  { label: schemaNames[0], data: Scorecard },
  { label: schemaNames[2], data: Indicator },
  { label: schemaNames[4], data: LanguageIndicator },
  { label: schemaNames[5], data: Facilitator },
  { label: schemaNames[10], data: Rating },
  { label: schemaNames[13], data: ProgramLanguage },
  { label: schemaNames[17], data: ProposedIndicator },
  { label: schemaNames[18], data: VotingIndicator },
  { label: schemaNames[20], data: EndpointUrl }
];

const schemaV19 = {
  schema: schemaHelper.getSchemas(changedSchemas),
  schemaVersion: 19,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 19) {
      endpointUrlMigrationService.updateEndpointUrlId(oldRealm, newRealm);

      languageIndicatorMigrationService.addIndicatorUuid(oldRealm, newRealm);
      languageIndicatorMigrationService.createMissingCustomLanguageIndicator(oldRealm, newRealm);

      indicatorMigrationService.addProgramUuidAndEndpointId(oldRealm, newRealm);

      scorecardMigrationService.addProgramUuid(oldRealm, newRealm);
    }
  }
}

export default schemaV19;