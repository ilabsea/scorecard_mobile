import tips from '../db/jsons/tips';

const getTipByScreenName = (screenName) => {
  return tips.filter(t => t.screenName == screenName)[0] || tips[0]
}

export { getTipByScreenName };