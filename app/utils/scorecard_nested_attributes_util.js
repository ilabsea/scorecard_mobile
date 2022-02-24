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

  console.log('raised_indicators_attributes === ', JSON.stringify(nestedAttributes.raised_indicators_attributes));
  console.log('===============================================');
  console.log('voting_indicators_attributes === ', JSON.stringify(nestedAttributes.voting_indicators_attributes));

  return nestedAttributes;
}