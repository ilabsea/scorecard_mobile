import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Clipboard from '@react-native-clipboard/clipboard';
import { getDeviceStyle, isShortWidthScreen } from './responsive_util';
import urlUtil from './url_util';
import { isNumber } from './string_util';
import { validScorecardUrls } from '../constants/url_constant';
import { ERROR_INVALID_SCORECARD_URL } from '../constants/error_constant';
import { IN_REVIEW } from '../constants/scorecard_constant';
import { INVALID_SCORECARD_ATTEMPT } from '../constants/lock_device_constant';
import lockDeviceService from '../services/lock_device_service';

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

export const getLocationMaxWidth = (scorecard, language) => {
  const pixelPerCharacter = wp('2%');
  let locationWidth = (scorecard.province.length + scorecard.commune.length + scorecard.district.length);

  const primarySchoolLength = scorecard.primary_school != null ? JSON.parse(scorecard.primary_school).name_en.length : 0;
  const factoryLength = scorecard.dataset != null ? JSON.parse(scorecard.dataset)[`name_${language}`].length / 5 : 0;
  locationWidth += (primarySchoolLength + factoryLength);
  const mainLocationWidth = (primarySchoolLength + factoryLength + scorecard.province.length) * pixelPerCharacter;

  // If the width of  primary school + province very long then the district and commun will not show in the list item
  if (isShortWidthScreen() && mainLocationWidth >= wp('42%'))
    return wp('23%')

  locationWidth = locationWidth * pixelPerCharacter;
  const locationLength = factoryLength > 0 ? scorecard.district.length + getDeviceStyle(0, 10) : scorecard.commune.length + 2;            // +2 because district and commune are include , and 1 space

  if (locationWidth > wp('70%') && scorecard.uploaded_date) {
    const locationPixel = {
      'km': getDeviceStyle(wp('1%'), wp('0.7%')),
      'en': getDeviceStyle(wp('0.4%'), 0),
      default: getDeviceStyle(wp('1%'), wp('0.8%'))
    }

    return locationLength * (scorecard.primary_school != null ? locationPixel[language] : locationPixel.default);
  }
  const mobilePixel = isShortWidthScreen() ? wp('2.5%') : wp('3%')
  return getDeviceStyle(locationLength * wp('6.3%'), locationLength * mobilePixel)
}

export const handleScorecardCodeClipboard = async (updateErrorState) => {
  if (await lockDeviceService.isLocked(INVALID_SCORECARD_ATTEMPT))
    return;

  let copiedText = await Clipboard.getString();
  copiedText = copiedText.replace(' ', '');

  // Not showing alert message when copied text is null or '' or is not URL format and not number only
  // To prevent the alert message keep showing when the user copies the text for other purpose then open CSC mobile
  if (_isNotValidCopiedText(copiedText))
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

const _isNotValidCopiedText = (copiedText) => {
  return copiedText == '' || (!urlUtil.isUrl(copiedText) && !isNumber(copiedText));
}

export const isScorecardInReview = (scorecard) => {
  return scorecard.milestone === IN_REVIEW;
}