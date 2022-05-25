import ProgramLanguage from '../migrations/v3/programLanguage';
import Scorecard from '../migrations/v19/scorecard';
import ProposedIndicator from '../migrations/v12/proposedIndicator';
import Indicator from '../migrations/v19/indicator';
import LanguageIndicator from '../migrations/v19/languageIndicator';
import EndpointUrl from '../migrations/v19/endpointUrl';
import Rating from '../migrations/v14/rating';
import VotingIndicator from '../migrations/v14/votingIndicator';
import Facilitator from '../migrations/v16/facilitator';
import EndpointUrl from '../migrations/v19/endpointUrl';

import endpointUrlHelper from '../../helpers/endpoint_url_helper';
import schemaHelper from '../../helpers/schema_helper';
import { schemaNames } from '../../constants/schema_constant';
import { defaultEndpointUrls } from '../../constants/url_constant';
import {CUSTOM} from '../../constants/main_constant';

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
      const oldEndpointUrls = oldRealm.objects('EndpointUrl').sorted('order');
      const newEndpointUrls = newRealm.objects('EndpointUrl').sorted('order');
      const oldCustomEndpointUrls = oldRealm.objects('EndpointUrl').filtered(`type = '${CUSTOM}' SORT(order ASC)`);

      oldEndpointUrls.map((oldEndpointUrl, index) => {
        const shortcutInfo = endpointUrlHelper.generateShortcutInfo(oldCustomEndpointUrls, oldObject.value);
        // Update the label of "ISAF Staging Server" to "ISAF Testing Server"
        if (oldEndpointUrl.value == defaultEndpointUrls[0].value)
          newEndpointUrls[index].label = defaultEndpointUrls[0].label;

        newEndpointUrls[index].shortcut = !oldEndpointUrl.shortcut ? shortcutInfo.shortcut : oldEndpointUrl.shortcut;
        newEndpointUrls[index].shortcut_bg_color = !oldEndpointUrl.shortcut_bg_color ? shortcutInfo.shortcut_bg_color : oldEndpointUrl.shortcut_bg_color;
        newEndpointUrls[index].shortcut_text_color = !oldEndpointUrl.shortcut_text_color ? shortcutInfo.shortcut_text_color : oldEndpointUrl.shortcut_text_color;
        newEndpointUrls[index].id = !oldEndpointUrl.id ? index + 1 : oldEndpointUrl.id;
      });

      const oldLangIndicators = oldRealm.objects('LanguageIndicator');
      const newLangIndicators = newRealm.objects('LanguageIndicator');

      // Find the indicator and add the indicator_uuid to languageIndicator
      oldLangIndicators.map((oldLangIndicator, index) => {
        if (oldLangIndicator.type == CUSTOM)
          newLangIndicators[index].indicator_uuid = oldLangIndicator.indicator_id;
        else {
          const indicator = oldRealm.objects('Indicator').filtered(`id = ${ parseInt(oldLangIndicator.indicator_id) }`)[0];
          newLangIndicators[index].indicator_uuid = indicator.indicator_uuid || '';
        }
      });

      const oldIndicators = oldRealm.objects('Indicator');
      const newIndicators = newRealm.objects('Indicator');

      oldIndicators.map((oldIndicator, index) => {
        newIndicators[index].program_uuid = !oldIndicator.program_uuid ? '' : oldIndicator.program_uuid;
        newIndicators[index].endpoint_id = !oldIndicator.endpoint_id ? null : oldIndicator.endpoint_id;
      });

      const oldScorecards = oldRealm.objects('Scorecard');
      const newScorecards = newRealm.objects('Scorecard');

      oldScorecards.map((oldScorecard, index) => {
        newScorecards[index].program_uuid = !oldScorecard.program_uuid ? '' : oldScorecard.program_uuid;
      });
    }
  }
}

export default schemaV19;