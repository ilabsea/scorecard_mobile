'use strict';

import Realm from 'realm';
// import UserSchema from './user';
import LanguageSchema from './models/language';
import IndicatorSchema from './models/indicator';
import CafSchema from './models/caf';
import LanguageIndicatorSchema from './models/languageIndicator';
import FacilitatorSchema from './models/facilitator';
import Scorecard from './models/scorecard';
import ScorecardPreferenceSchema from './models/scorecardPreference';
import ParticipantInformationSchema from './models/participantInformation';
import ParticipantSchema from './models/participant';
import CustomIndicatorSchema from './models/customIndicator';

import ProposedCriteriaSchema from './models/proposedCriteria';
import VotingCriteriaSchema from './models/votingCriteria';
import RatingSchema from './models/rating';

const schema0 = [
  Scorecard.schema,
  LanguageSchema,
  IndicatorSchema,
  CafSchema,
  LanguageIndicatorSchema,
  ScorecardPreferenceSchema,
  FacilitatorSchema,
  ParticipantInformationSchema,
  ParticipantSchema,

  // ===ProposedCriteria===
  ProposedCriteriaSchema,

  // ===VotingCriteria===
  VotingCriteriaSchema,
  RatingSchema,
  CustomIndicatorSchema,
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
