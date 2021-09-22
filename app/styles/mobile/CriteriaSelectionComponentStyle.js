import { StyleSheet, Dimensions } from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { isShortScreenDevice } from '../../utils/responsive_util';
import Color from '../../themes/color';
import { cardBorderRadius } from '../../constants/border_radius_constant';

const windowWidth = Math.floor(Dimensions.get('window').width);
const itemWidth = windowWidth >= 550 ? (windowWidth - 60) / 2 : (windowWidth - 40);
const itemHeight = isShortScreenDevice() ? hp('13%') : hp('11.5%');

const CriteriaSelectionComponentStyles = StyleSheet.create({
  criteriaBoxContainer: {
    backgroundColor: Color.whiteColor,
    borderRadius: cardBorderRadius,
    flexDirection: 'row',
    marginBottom: 10,
    marginHorizontal: 10,
    width: itemWidth,
    height: itemHeight,
    shadowColor: Color.blackColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: Color.paleGrayColor,
  },
  criteriaBox: {
    flexDirection: 'row',
    flex: 1,
  },
  iconContainer: {
    width: itemHeight,
    backgroundColor: Color.cardListItemAvataBg,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  criteriaShortcut: {
    color: Color.paleBlackColor,
    fontSize: 30,
    fontWeight: 'bold',
  },
  detailContainer: {
    paddingLeft: 10,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  indicatorImage: {
    width: '99%',
    height: '99%',
    borderWidth: 0,
    borderColor: 'transparent'
  }
});

export default CriteriaSelectionComponentStyles;