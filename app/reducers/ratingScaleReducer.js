import {PAUSED} from '../constants/indicator_constant';
const initState = {status: PAUSED}

const ratingScaleAudioReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_RATING_SCALE_AUDIO_STATUS':
      return {status: action.payload};
    default:
      return state;
  }
}

export {ratingScaleAudioReducer};