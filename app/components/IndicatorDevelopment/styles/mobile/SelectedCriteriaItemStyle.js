import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { isShortScreenDevice, isShortWidthScreen } from '../../../../utils/responsive_util';

const getContainerHeight = () => {
  if (isShortWidthScreen())
    return hp('17%');

  return isShortScreenDevice() ? hp('20%') : hp('15%')
}

const SelectedCriteriaItemStyles = StyleSheet.create({
  itemContainer: {
    height: getContainerHeight(),
  },
});

export default SelectedCriteriaItemStyles;