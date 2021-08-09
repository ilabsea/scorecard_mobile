import { Dimensions } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { getDeviceStyle } from './responsive_util';

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

export const getDistrictWidth = (scorecard) => {
  const screenWidth = Dimensions.get('screen').width;
  const pixelPerCharacter = wp('2%');
  const locationWidth = (scorecard.province.length + scorecard.commune.length + scorecard.district.length) * pixelPerCharacter;

  if (locationWidth > (screenWidth - getDeviceStyle(67, 59)))
    return scorecard.district.length * wp('1%');

  return scorecard.district.length * wp('2%');
}