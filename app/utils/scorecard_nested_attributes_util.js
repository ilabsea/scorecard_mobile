import facilitatorAttributesUtil from './facilitator_attributes_util';
import participantAttributesUtil from './participant_attributes_util';
import proposedIndicatorAttributesUtil from './proposed_indicator_attributes_util';
import votingAttributesUtil from './voting_attributes_util';
import ratingAttributesUtil from './rating_attributes_util';

export const getNestedAttributes = (scorecard) => {
  const nestedScorecardAttributes = [
    facilitatorAttributesUtil,
    participantAttributesUtil,
    proposedIndicatorAttributesUtil,
    votingAttributesUtil,
    ratingAttributesUtil
  ];

  let nestedAttributes = {};

  nestedScorecardAttributes.map(scorecardAttribute => {
    nestedAttributes = {...nestedAttributes, ...scorecardAttribute.parse(scorecard)}
  });

  return nestedAttributes;
}