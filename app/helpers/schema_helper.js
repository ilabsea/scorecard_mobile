import Scorecard from '../db/migrations/v1/scorecard';
import LanguageSchema from '../db/migrations/v1/language';
import IndicatorSchema from '../db/migrations/v1/indicator';
import CafSchema from '../db/migrations/v1/caf';
import LanguageIndicatorSchema from '../db/migrations/v1/languageIndicator';
import FacilitatorSchema from '../db/migrations/v1/facilitator';
import ParticipantSchema from '../db/migrations/v1/participant';
import CustomIndicatorSchema from '../db/migrations/v1/customIndicator';
import ProposedCriteriaSchema from '../db/migrations/v1/proposedCriteria';
import VotingCriteriaSchema from '../db/migrations/v1/votingCriteria';
import RatingSchema from '../db/migrations/v1/rating';
import LanguageRatingScaleSchema from '../db/migrations/v1/languageRatingScale';
import RatingScaleSchema from '../db/migrations/v1/ratingScale';
import ProgramLanguageSchema from '../db/migrations/v1/programLanguage';
import ScorecardDownloadSchema from '../db/migrations/v1/scorecardDownload';
import ContactSchema from '../db/migrations/v1/contact';
import ScorecardReferenceSchema from '../db/migrations/v1/scorecardReference';
import ProposedIndicatorSchema from '../db/migrations/v12/proposedIndicator';
import VotingIndicatorSchema from '../db/migrations/v14/votingIndicator';
import ScorecardProposedIndicator from '../db/migrations/v15/scorecardProposedIndicator';

import { schemaNames } from '../constants/schema_constant';

const schemaHelper = (() => {
  return {
    getSchemas,
  };

  function getSchemas(changedSchemas) {
    // changedSchemas parameter format (e.g: [label: 'Language', data: LanguageSchema])

    // schames order must be the same order to migration constant
    let schemas = [
      Scorecard,
      LanguageSchema,
      IndicatorSchema,
      CafSchema,
      LanguageIndicatorSchema,
      FacilitatorSchema,
      ParticipantSchema,
      CustomIndicatorSchema,
      ProposedCriteriaSchema,
      VotingCriteriaSchema,
      RatingSchema,
      LanguageRatingScaleSchema,
      RatingScaleSchema,
      ProgramLanguageSchema,
      ScorecardDownloadSchema,
      ContactSchema,
      ScorecardReferenceSchema,
      ProposedIndicatorSchema,
      VotingIndicatorSchema,
      ScorecardProposedIndicator,
    ];

    changedSchemas.map((schema) => {
      const index = schemaNames.indexOf(schema.label);
      schemas[index] = schema.data;
    })

    return schemas;
  }
})();

export default schemaHelper;