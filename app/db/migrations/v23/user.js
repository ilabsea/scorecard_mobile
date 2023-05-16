'use strict';

const UserSchema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: 'int',
    email: 'string',
    password: 'string',
  }
}

export default UserSchema;