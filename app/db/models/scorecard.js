'use strict';

const ScorecardSchema = {
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
    number_of_participant: 'int?',
    number_of_female: 'int?',
    number_of_disability: 'int?',
    number_of_ethnic_minority: 'int?',
    number_of_youth: 'int?',
    number_of_id_poor: 'int?',
    status: 'string?',
    local_ngo_name: 'string',
    local_ngo_id: 'int',
    province: 'string',
    district: 'string',
    commune: 'string',
    program_id: 'int',
  }
}

export default ScorecardSchema;
