import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Clipboard from '@react-native-clipboard/clipboard';
import { getDeviceStyle, isShortWidthScreen } from './responsive_util';
import { isNumber } from './string_util';
import { validScorecardUrls } from '../constants/url_constant';
import { ERROR_INVALID_SCORECARD_URL } from '../constants/error_constant';
import { IN_REVIEW } from '../constants/milestone_constant';

export const getUniqueScorecards = (scorecards) => {
  return scorecards.filter((scorecard, index, array) => array.findIndex(t => t.uuid == scorecard.uuid) == index);
}

export const getListStickyIndices = (finishedScorecards) => {
  let indices = [0];

  finishedScorecards.map((scorecard, index) => {
    indices.push((index+1) * 2)
  });

  return indices;
}

export const getLocationMaxWidth = (scorecard) => {
  const pixelPerCharacter = wp('2%');
  let locationWidth = (scorecard.province.length + scorecard.commune.length + scorecard.district.length);

  const primarySchoolLength = scorecard.primary_school != null ? JSON.parse(scorecard.primary_school).name_en.length : 0;
  locationWidth += primarySchoolLength;
  const mainLocationWidth = (primarySchoolLength + scorecard.province.length) * pixelPerCharacter;

  // If the width of  primary school + province very long then the district and commun will not show in the list item
  if (isShortWidthScreen() && mainLocationWidth >= wp('42%'))
    return 0;

  locationWidth = locationWidth * pixelPerCharacter;
  const locationLength = scorecard.district.length + scorecard.commune.length + 2;           // +2 because district and commune are include , and 1 space

  if (locationWidth > wp('70%') && scorecard.uploaded_date)
    return locationLength * (scorecard.primary_school != null ? getDeviceStyle(wp('0.8%'), wp('0.6%')) : getDeviceStyle(wp('1%'), wp('0.8%')));

  return getDeviceStyle(locationLength * wp('3.8%'), locationLength * wp('1%'))
}

export const handleScorecardCodeClipboard = async (updateErrorState) => {
  let copiedText = await Clipboard.getString();
  copiedText = copiedText.replace(' ', '');

  if (copiedText == 'null' || copiedText == '')
    return;

  if (!_isValidScorecardUrl(copiedText) && !isNumber(copiedText)) {
    _handelInvalidUrl(updateErrorState);
    return;
  }

  copiedText = copiedText.slice(-6);
  if (!isNumber(copiedText)) {    // if the last 6 digits contain a special character or letter
    _handelInvalidUrl(updateErrorState);
    return;
  }

  Clipboard.setString(copiedText);
}

const _handelInvalidUrl = (updateErrorState) => {
  Clipboard.setString(null);
  setTimeout(() => {
    updateErrorState(ERROR_INVALID_SCORECARD_URL);
  }, 100);
}

const _isValidScorecardUrl = (copiedText) => {
  for(let i = 0; i < validScorecardUrls.length; i++) {
    if (copiedText.includes(validScorecardUrls[i]))
      return true;
  }

  return false;
}

export const isScorecardInReview = (scorecard) => {
  return scorecard.milestone === IN_REVIEW;
}