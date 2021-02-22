'use strict';

import Realm from 'realm';
// import UserSchema from './user';
import LanguageSchema from './migrations/language';
import IndicatorSchema from './migrations/indicator';
import CafSchema from './migrations/caf';
import LanguageIndicatorSchema from './migrations/languageIndicator';
import FacilitatorSchema from './migrations/facilitator';
import Scorecard from './migrations/scorecard';
import ParticipantSchema from './migrations/participant';
import CustomIndicatorSchema from './migrations/customIndicator';

import ProposedCriteriaSchema from './migrations/proposedCriteria';
import VotingCriteriaSchema from './migrations/votingCriteria';
import RatingSchema from './migrations/rating';
import LanguageRatingScaleSchema from './migrations/languageRatingScale';
import RatingScaleSchema from './migrations/ratingScale';
import ProgramLanguageSchema from './migrations/programLanguage';
import ScorecardDownloadSchema from './migrations/scorecardDownload';

import ContactSchema from './migrations/contact';

const schema0 = [
  Scorecard,
  LanguageSchema,
  IndicatorSchema,
  CafSchema,
  LanguageIndicatorSchema,
  FacilitatorSchema,
  ParticipantSchema,
  ProgramLanguageSchema,
  ScorecardDownloadSchema,

  // ===ProposedCriteria===
  ProposedCriteriaSchema,

  // ===VotingCriteria===
  VotingCriteriaSchema,
  RatingSchema,
  CustomIndicatorSchema,

  // ===Rating===
  LanguageRatingScaleSchema,
  RatingScaleSchema,

  ContactSchema,
];

const schemas = [
  { schema: schema0, schemaVersion: 0 }
]

// the first schema to update to is the current schema version
// since the first schema in our array is at
let nextSchemaIndex = Realm.schemaVersion(Realm.defaultPath);
if (nextSchemaIndex !== -1) {
  while (nextSchemaIndex < schemas.length) {
    const migratedRealm = new Realm(schemas[nextSchemaIndex++]);
    migratedRealm.close();
  }
}

export default new Realm(schemas[schemas.length-1]);
