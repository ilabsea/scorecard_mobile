'use strict';

const ContactSchema = {
  name: 'Contact',
  primaryKey: 'id',
  properties: {
    id: 'int',
    contact_type: 'string',
    value: 'string',
  }
}

export default ContactSchema;
