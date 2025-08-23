import { MIN_MODERN_ANDROID_SDK_LEVEL } from '../constants/main_constant';

const sdkVersionReducer = (state=MIN_MODERN_ANDROID_SDK_LEVEL, action) => {
  switch(action.type) {
    case 'SET':
      return action.payload;
    default:
      return state;
  }
}

export default sdkVersionReducer;