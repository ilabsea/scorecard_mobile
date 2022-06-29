import { INDICATOR_BASE_STEP, PARTICIPANT_BASE_STEP } from './scorecard_step_constant';

export const INDICATOR_BASE = 'indicatorBase';
export const PARTICIPANT_BASE = 'participantBase';

export const  PROPOSED_INDICATOR_METHODS = {
  'participantBase': { id: 1, name: PARTICIPANT_BASE, step: PARTICIPANT_BASE_STEP },
  'indicatorBase': { id: 2, name: INDICATOR_BASE, step: INDICATOR_BASE_STEP },
}