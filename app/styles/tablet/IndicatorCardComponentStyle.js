import { StyleSheet, Dimensions } from 'react-native';
import Color from '../../themes/color';
import { cardBorderRadius } from '../../constants/border_radius_constant';

const windowWidth = Math.floor(Dimensions.get('window').width);
const itemWidth = windowWidth >= 550 ? (windowWidth - 60) / 2 : (windowWidth - 40);
const itemHeight = 100

const IndicatorCardComponentStyles = StyleSheet.create({
  indicatorBoxContainer: {
    backgroundColor: Color.whiteColor,
    borderRadius: cardBorderRadius,
    flexDirection: 'row',
    marginBottom: 10,
    marginHorizontal: 8,
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
  },
  indicatorBox: {
    flexDirection: 'row',
    flex: 1,
  },
  detailContainer: {
    paddingLeft: 10,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});

export default IndicatorCardComponentStyles;