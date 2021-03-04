import schemaHelper from '../../helpers/schema_helper';

const schemaV1 = {
  schema: schemaHelper.getSchemas([]),
  schemaVersion: 1,
  migration: (oldRealm, newRealm) => {},
};

export default schemaV1;