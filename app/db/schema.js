'use strict';

import Realm from 'realm';
// import UserSchema from './user';
import LanguageSchema from './models/language';
import IndicatorSchema from './models/indicator';
import CafSchema from './models/caf';
import LanguageIndicatorSchema from './models/languageIndicator';
import FacilitatorSchema from './models/facilitator';
import Scorecard from './models/scorecard';
import ParticipantSchema from './models/participant';
import CustomIndicatorSchema from './models/customIndicator';

import ProposedCriteriaSchema from './models/proposedCriteria';
import VotingCriteriaSchema from './models/votingCriteria';
import RatingSchema from './models/rating';
import LanguageRatingScaleSchema from './models/languageRatingScale';
import RatingScaleSchema from './models/ratingScale';
import ProgramLanguageSchema from './models/programLanguage';
import ScorecardDownloadSchema from './models/scorecardDownload';

import ContactSchema from './models/contact';

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
