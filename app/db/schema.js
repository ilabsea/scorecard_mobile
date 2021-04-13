'use strict';

import Realm from 'realm';

import schemaV1 from './schemas/schemaV1';
import schemaV2 from './schemas/schemaV2';
import schemaV3 from './schemas/schemaV3';
import schemaV4 from './schemas/schemaV4';
import schemaV5 from './schemas/schemaV5';
import schemaV6 from './schemas/schemaV6';

const schemas = [
  schemaV1,
  schemaV2,
  schemaV3,
  schemaV4,
  schemaV5,
  schemaV6,
];

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
