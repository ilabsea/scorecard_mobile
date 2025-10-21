import {combineReducers} from 'redux';
import selectedIndicatorReducer from './selectedIndicatorReducer';
import proposedIndicatorReducer from './proposedIndicatorReducer';
import votingIndicatorReducer from './votingIndicatorReducer';
import participantReducer from './participantReducer';
import {ratingScaleAudioReducer} from './ratingScaleReducer';
import currentScorecardReducer from './currentScorecardReducer';
import scorecardReferenceReducer from './scorecardReferenceReducer';
import sdkVersionReducer from './sdkVersionReducer';

const allReducers = combineReducers({
  selectedIndicators: selectedIndicatorReducer,
  proposedIndicators: proposedIndicatorReducer,
  votingIndicators: votingIndicatorReducer,
  participantReducer,
  ratingScaleAudioReducer,
  currentScorecard: currentScorecardReducer,
  scorecardReferences: scorecardReferenceReducer,
  sdkVersion: sdkVersionReducer
});

const rootReducer = (state, action) => {
  return allReducers(state, action);
};

export default rootReducer;
