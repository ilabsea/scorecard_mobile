'use strict';

class Scorecard {
  get isCompleted() {
    return this.status == '5';
  }
}

Scorecard.schema = {
  name: 'Scorecard',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    unit_type: 'string',
    facility_id: 'int',
    facility: 'string',
    scorecard_type: 'string',
    name: 'string',
    description: 'string?',
    year: 'int',
    conducted_date: 'string?',
    number_of_caf: 'int?',
    number_of_participant: { type: 'int?', default: 0 },
    number_of_female: { type: 'int?', default: 0 },
    number_of_disability: { type: 'int?', default: 0 },
    number_of_ethnic_minority: { type: 'int?', default: 0 },
    number_of_youth: { type: 'int?', default: 0 },
    number_of_id_poor: { type: 'int?', default: 0 },
    status: { type: 'string', default: '1' },
    local_ngo_name: 'string',
    local_ngo_id: 'int',
    province: 'string',
    district: 'string',
    commune: 'string',
    program_id: 'int',
    uploaded: { type: 'bool', default: false },
    downloaded: { type: 'bool', default: false },
    text_language_code: 'string?',
    audio_language_code: 'string?'
  }
}

export default Scorecard;
