import ProgramLanguage from '../migrations/v3/programLanguage';
import Scorecard from '../migrations/v11/scorecard';
import VotingCriteria from '../migrations/v9/votingCriteria';
import ProposedIndicator from '../migrations/v12/proposedIndicator';
import Indicator from '../migrations/v13/indicator';
import schemaHelper from '../../helpers/schema_helper';
import { schemaNames } from '../../constants/schema_constant';
import { PREDEFINED_INDICATOR, CUSTOM_INDICATOR } from '../../constants/indicator_constant';

const changedSchemas = [
  { label: schemaNames[0], data: Scorecard },
  { label: schemaNames[2], data: Indicator },
  { label: schemaNames[9], data: VotingCriteria },
  { label: schemaNames[13], data: ProgramLanguage },
  { label: schemaNames[17], data: ProposedIndicator },
];

const schemaV13 = {
  schema: schemaHelper.getSchemas(changedSchemas),
  schemaVersion: 13,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 13) {
      const customIndicators = oldRealm.objects('CustomIndicator');
      const oldIndicators = oldRealm.objects('Indicator');
      const newIndicators = newRealm.objects('Indicator');

      // Copy all the existing predefined indicator (from indicator schema)
      oldIndicators.map((oldIndicator, index) => {
        newIndicators[index].indicator_uuid = null,
        newIndicators[index].type = PREDEFINED_INDICATOR;
      });

      // Add all the custom indicator (from custom indicator) to indicator and remove them from custom indicator table
      customIndicators.map(customIndicator => {
        const data = {
          uuid: customIndicator.uuid,
          indicator_uuid: customIndicator.uuid,
          id: !!customIndicator.id_from_server ? customIndicator.id_from_server : null,
          name: customIndicator.name,
          facility_id: null,
          tag: !!customIndicator.tag ? customIndicator.tag : null,
          scorecard_uuid: customIndicator.scorecard_uuid,
          type: CUSTOM_INDICATOR,
        };

        newRealm.delete(customIndicator);
        newRealm.create('Indicator', data, 'modified');
      });
    }
  }
}

export default schemaV12;