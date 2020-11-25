'use strict';

import Realm from 'realm';
// import UserSchema from './user';
import LanguageSchema from './models/language';
import IndicatorSchema from './models/indicator';
import CafSchema from './models/caf';
import LanguageIndicatorSchema from './models/languageIndicator';
import FacilitatorSchema from './models/facilitator';
import ScorecardSchema from './models/scorecard';
import ParticipantInformationSchema from './models/participantInformation';
import ParticipantSchema from './models/participant';

const schema0 = [
  ScorecardSchema,
  LanguageSchema,
  IndicatorSchema,
  CafSchema,
  LanguageIndicatorSchema,
  FacilitatorSchema,
  ParticipantInformationSchema,
  ParticipantSchema,
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
