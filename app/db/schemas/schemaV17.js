import AsyncStorage from '@react-native-community/async-storage';

import ProgramLanguage from '../migrations/v3/programLanguage';
import Scorecard from '../migrations/v17/scorecard';
import ProposedIndicator from '../migrations/v12/proposedIndicator';
import Indicator from '../migrations/v13/indicator';
import Rating from '../migrations/v14/rating';
import VotingIndicator from '../migrations/v14/votingIndicator';
import Facilitator from '../migrations/v16/facilitator';

import schemaHelper from '../../helpers/schema_helper';
import { schemaNames } from '../../constants/schema_constant';

const changedSchemas = [
  { label: schemaNames[0], data: Scorecard },
  { label: schemaNames[2], data: Indicator },
  { label: schemaNames[5], data: Facilitator },
  { label: schemaNames[10], data: Rating },
  { label: schemaNames[13], data: ProgramLanguage },
  { label: schemaNames[17], data: ProposedIndicator },
  { label: schemaNames[18], data: VotingIndicator }
];

const schemaV17 = {
  schema: schemaHelper.getSchemas(changedSchemas),
  schemaVersion: 17,
  migration: async (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 17) {
      const oldFacilitators = oldRealm.objects('Scorecard');
      const newFacilitators = newRealm.objects('Scorecard');
      const savedSetting = JSON.parse(await AsyncStorage.getItem('SETTING'));

      oldFacilitators.map((oldFacilitator, index) => {
        if (!oldFacilitator.endpoint_url)
          newFacilitators[index].endpoint_url = !!savedSetting ? `${savedSetting.email}@${savedSetting.backendUrl}` : '';
        else
          newFacilitators[index].endpoint_url = oldFacilitator.endpoint_url;
      });
    }
  }
}

export default schemaV17;